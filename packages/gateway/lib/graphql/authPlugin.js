import {
    makeExtendSchemaPlugin,
} from 'graphile-utils';
import gql from 'graphql-tag';
import _ from 'lodash';
import {execute} from 'graphql-tools';
import {parse} from 'graphql-parse-resolve-info';
import jwt from 'jsonwebtoken';

import UserService from "../services/users";



export function resolveFromSourceFirst(builder){
    builder.hook(
        "GraphQLObjectType:fields:field",
        (field, {extend}, scope)=>{

            const {resolve: oldResolver} = field;
            if(!oldResolver)
                return field;


            field.resolve = (source, args, context, info) => {
              if(_.isObjectLike(source) && source[info.fieldName])
                  return source[info.fieldName];
              return oldResolver(source, args, context, info);
            };

            return field;
        }
    )
}


export function currentUserPlugin (builder) {

    /***************************************************************************
     * Adds the currentUser query to the schema
     ***************************************************************************/
    builder.hook(
        "GraphQLObjectType:fields",
        (
            fields, // Input object - the fields for this GraphQLObjectType
            { extend, getTypeByName }, // Build object - handy utils
            { scope: { isRootQuery } } // Context object - used for filtering
        ) => {

            if (!isRootQuery) {
                return fields;
            }

            const { userById } = fields;
            if (!userById) {
                console.log("Warning: currentUser Query broken!");
                return fields;
            }

            const { type: User, resolve: oldResolver } = userById;

            const resolve = (parent, args, context, info) => {

                const { session, req } = context;

                return new Promise((resolve, reject) => {

                    const authHeader = req.get('Authorization');
                    if(!authHeader) {
                        resolve(null);
                        return;
                    }

                    const authPieces  = authHeader.split(' ');
                    if(authPieces[0] !== "Bearer"){
                        resolve(null);
                        return;
                    }

                    const token = authPieces[1];

                    console.log("Received token and verifying");
                    jwt.verify(token, "jack", function(err, decoded) {
                        if(err){
                            reject(err);
                            return;
                        }

                        if(!decoded.id){
                            resolve(null);
                            return;
                        }

                        console.log("HERE");
                        resolve(oldResolver(parent, { id: decoded.id }, context, info).then(res => {
                            console.log(res);
                            return res;
                        }));
                    });
                });
            };

            return extend(
                fields,
                {
                    currentUser: {
                        type: User,
                        resolve,
                        description: "The currently logged in User. Returns 'null' if noone is logged in."
                    }
                }
            );
        }
    );


    /***************************************************************************
     * Adds login and logout functionality to the schema
     ***************************************************************************/
    builder.hook(
        "GraphQLObjectType:fields",
        (
            fields, // Input object - the fields for this GraphQLObjectType
            { extend, graphql, getTypeByName }, // Build object - handy utils
            { scope: { isRootMutation } } // Context object - used for filtering
        ) => {


            if (!isRootMutation) {
                return fields;
            }

            if (!fields.createAndLoadUserByStellarPublicKey) {
                console.log("Warning: login/logout mutations broken!");
                return fields;
            }

            //login logic
            let loginQuery = gql`
                mutation createAndReturnUser($stellarPublicKey: String!){
                    createAndLoadUserByStellarPublicKey(input: {stellarPublicKey: $stellarPublicKey}){
                        users{
                            id
                        }
                    }
                }
            `;

            const dynamicSelection = loginQuery.definitions[0].selectionSet.selections[0].selectionSet.selections[0].selectionSet;

            const login = {
                type: getTypeByName('User'),
                args: {
                    stellarPublicKey: {
                        type: graphql.GraphQLNonNull(graphql.GraphQLString)
                    },
                    payload: {
                        type: graphql.GraphQLNonNull(graphql.GraphQLString)
                    },
                    signature: {
                        type: graphql.GraphQLNonNull(graphql.GraphQLString)
                    }
                },
                resolve: async (parent, { stellarPublicKey, payload, signature }, context, info) => {

                    //reject login
                    if (!UserService.verifySignature(stellarPublicKey, payload, signature))
                        return null;

                    //forward the query //TODO create an API for doing this
                    //TODO look to see if we can replace the fragments here instead of rehydrating them below
                    dynamicSelection.selections = extractSelectionSetFromResolveInfo(info);
                    const result = await graphql.execute(
                        info.schema,
                        loginQuery,
                        undefined,
                        context,
                        { stellarPublicKey }
                    );

                    //save the session information
                    return new Promise((res, rej)=> {
                        jwt.sign(
                            {
                                aud: 'postgraphile',
                                id: result.data.createAndLoadUserByStellarPublicKey.users[0].id,
                                role: "postgres"
                            },
                            "jack",
                            (err, token) => {
                                if (err)
                                    rej(err);

                                context.res.set({
                                   'Authorization': `Bearer ${token}`
                                });
                                res(result.data.createAndLoadUserByStellarPublicKey.users[0]);

                            })
                    });
                },
                description: "Login mechanism for the gateway"
            };


            const logout = {
                type: graphql.GraphQLBoolean,
                description: "Logout mechanism for the gateway",
                resolve(source, args, { session }) {
                    delete session.currentUserId;
                    return true;
                }
            };

            return extend(
                fields,
                { login, logout }
            )
        }
    );
}

/*******************************************************************************
 * Utility Functions - TODO Need to export
 *******************************************************************************/

const extractSelectionSetFromResolveInfo = (info) => {
    let selections = _.flatten(info.fieldNodes.map((node) => {
        return node.selectionSet.selections;
    }));

    selections = _.flatten(selections.map((selectionNode) => {
       if(selectionNode.kind  !== 'FragmentSpread'){
           return selectionNode;
       }
        return info.fragments[selectionNode.name.value].selectionSet.selections;
    }));

    return selections;
};

