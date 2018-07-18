import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import CategoryLandingComponent from "./Component";

import {GetProductCategory} from "GQLTypes";
import { RouteComponentProps } from "react-router";
import { IPresentableCategoryTypeGuards } from "../PresentableCategoryType";

interface IComponentProps extends RouteComponentProps<any> {}

class Category extends React.PureComponent<IComponentProps> {
    public render() {

        const categoryID = this.props.match.params.id;

        return (
            <Query
                query={query}
                variables={{categoryID}}
            >
                {({data, loading, error }) => {
                    if (loading || error) { return <div />; }
                    const {productCategoryById: category} = data as GetProductCategory.Query;
                    if (!IPresentableCategoryTypeGuards.is(category)) { return <div />; }
                    return <CategoryLandingComponent category={category} />;
                }}
            </Query>
        );
    }
}

const query = gql`
    query GetProductCategory($categoryID: UUID!){
        productCategoryById(id: $categoryID){
            id
            name
            description
        }
    }
`;

export default Category;
