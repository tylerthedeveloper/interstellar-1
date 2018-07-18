import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";

import {GetCategoryInfo} from "GQLTypes";
import { IPresentableCategoryTypeGuards } from "../PresentableCategoryType";
import CategoryComponent from "./Component";

class Category extends React.PureComponent<{}> {
    public render() {
        return (
            <Query query={query}>
                {({data, loading, error }) => {
                    if (loading || error) { return <div />; }

                    const {allProductCategories} = data as GetCategoryInfo.Query;
                    if (!allProductCategories) { return <div />; }

                    const {nodes: categories} = allProductCategories;
                    return <CategoryComponent categories={IPresentableCategoryTypeGuards.retainOnly(categories)} />;
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
