// @flow

import React from "react";

import query from "../../../models/remote/get_categories";

import CategoryComponent from "./Component";
import { Query } from "react-apollo";

class Category extends React.PureComponent<{}> {
    render() {
        return (
            <Query query={query}>
                {({ data, loading, error }) => {
                    if (loading || error) return <div />;

                    return <CategoryComponent categories={data.categories} />;
                }}
            </Query>
        );
    }
}

export default Category;
