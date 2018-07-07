// @flow

import React from "react";

import { getCategoryInfo } from "../../../api/gql/categories";

import CategoryComponent from "./Component";
import { Query } from "react-apollo";

class Category extends React.PureComponent<{}> {
    render() {
        return (
            <Query query={getCategoryInfo}>
                {({ data, loading, error }) => {
                    if (loading || error) return <div />;

                    return <CategoryComponent categories={data.categories} />;
                }}
            </Query>
        );
    }
}

export default Category;
