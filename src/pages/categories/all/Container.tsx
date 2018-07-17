import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import CategoryComponent from "./Component";
import {GetCategoryInfo} from "GQLTypes";
import { retainPresentableCategories } from "../PresentableCategoryType";

class Category extends React.PureComponent<{}> {
    render() {
        return (
            <Query query={query}>
                {({data, loading, error }) => {
                    if (loading || error) return <div />;

                    const {allProductCategories} = data as GetCategoryInfo.Query;
                    if(!allProductCategories) return <div />;

                    const {nodes: categories} = allProductCategories;
                    return <CategoryComponent categories={retainPresentableCategories(categories)} />;
                }}
            </Query>
        );
    }
}

const query = gql`
    query GetCategoryInfo {
        allProductCategories{
            nodes {
                id
                name
                description
            }
        }
    }
`;

export default Category;
