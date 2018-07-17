import * as React from "react";
import SellersComponent from "./Component";
import { Query } from "react-apollo";
import gql from 'graphql-tag';

/*** Types ***/
import {RouteComponentProps} from "react-router";
import {GetAllSellers} from 'GQLTypes';

interface ComponentProps extends RouteComponentProps<any> {}


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

                    const {allSellers} = data as GetAllSellers.Query;
                    if(!allSellers || allSellers.nodes) return <div />;

                    return <SellersComponent sellers={allSellers.nodes} />;
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
            }
        }
    }
`;

export default Category;
