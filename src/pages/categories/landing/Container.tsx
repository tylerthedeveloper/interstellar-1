import * as React from "react";
import CategoryLandingComponent from "./Component";
import { Query } from "react-apollo";
import gql from 'graphql-tag';

import {GetProductCategory} from 'GQLTypes';
import { isPresentableCategory } from "../PresentableCategoryType";
import { RouteComponentProps } from "react-router";

interface ComponentProps extends RouteComponentProps<any>{}


class Category extends React.PureComponent<ComponentProps> {
    render() {

        const categoryID = this.props.match.params.id;

        return (
            <Query
                query={query}
                variables ={{categoryID}}
            >
                {({data, loading, error }) => {
                    if (loading || error) return <div />;
                    const {productCategoryById: category} = data as GetProductCategory.Query;
                    if(!isPresentableCategory(category)) return <div />;
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
