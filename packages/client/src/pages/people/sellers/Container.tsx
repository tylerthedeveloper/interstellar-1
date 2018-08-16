import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import SellersComponent from "./Component";

/*** Types ***/
import {GetAllSellers} from "GQLTypes";
import {RouteComponentProps} from "react-router";
import {IPresentableSellerTypeGuards} from "./PresentableSellerType";

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

                    const {allSellers} = data as GetAllSellers.Query;
                    if (!allSellers) { return <div />; }

                    return <SellersComponent sellers={IPresentableSellerTypeGuards.retainOnly(allSellers.nodes)} />;
                }}
            </Query>
        );
    }
}

const query = gql`
    query GetAllSellers{
        allSellers{
            nodes {
                id
                username
                displayName
                profilePicture
            }
        }
    }
`;

export default Category;
