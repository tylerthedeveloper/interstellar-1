import graphql from "graphql";

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
    name: "Query",
    fields: {
        login_modal_open: {
            type: graphql.GraphQLBoolean
        }
    }
});
