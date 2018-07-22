import { GraphQLUpload } from 'apollo-upload-server'
import fs from 'fs'

export function uploadFilePlugin (builder) {


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

            if(!isRootMutation)
                return fields;

            const UploadFileResult = new graphql.GraphQLObjectType({
                name: "UploadFileResult",
                fields: {
                    id: {type: graphql.GraphQLString}
                },
                resolve(){
                    return {id: "Jack"}
                }
            });

            const uploadFile = {
                type: UploadFileResult,
                description: "File upload test",
                args: {
                    file: { type: GraphQLUpload}
                },
                async resolve(source, {file}) {
                    const { stream, filename, mimetype, encoding } = await file;
                    const path = `uploads/${filename}`;
                    return new Promise((resolve, reject) =>
                        stream
                            .on('error', error => {
                                if (stream.truncated)
                                // Delete the truncated file
                                    fs.unlinkSync(path);
                                reject(error)
                            })
                            .pipe(fs.createWriteStream(path))
                            .on('error', error => reject(error))
                            .on('finish', () => resolve({ id: "jack"}))
                    );
                }
            };
            console.log("Added!");

            return extend(
                fields,
                { uploadFile }
            )
        }
    );

    builder.hook(
        "GraphQLSchema",
        (
            schema,
            { extend, graphql, getTypeByName }, // Build object - handy utils
            { scope: { isRootMutation } } // Context object - used for filtering
        ) => {
            console.log(schema);
            return extend(
                schema,
                { Upload: GraphQLUpload }
            )
        }
    );
}
