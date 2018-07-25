import * as React from "react";
import * as _ from "lodash";

import GetAllProductInfoQuery from "Query/GetAllProductInfo";
import ProductPageComponent from './Component';

/***        Types       ***/
import { ApolloClient, ObservableQuery } from "apollo-client";
import { withApollo, WithApolloClient } from "react-apollo";
import { GetAllProductInfo } from "GQLTypes";


interface IContainerProps {
    productID: string;
    section: string;
}
type IContainerPropsWithApollo = WithApolloClient<IContainerProps>;


/***        Component       ***/
class Container extends React.PureComponent<IContainerPropsWithApollo> {

    private subscriptions: ZenObservable.Subscription[];
    private GetAllProductInfoQuery: ObservableQuery<any>;
    private client: ApolloClient<any>;
    public state: {
        product: GetAllProductInfo.ProductById | null
    };

    constructor(props: IContainerPropsWithApollo) {
        super(props);
        const { client, productID} = props;
        this.client = client;
        console.log("constructor!");
        console.log(productID);

        /*****  Set Up Subscriptions    *****/
        this.GetAllProductInfoQuery = client.watchQuery({
            query: GetAllProductInfoQuery,
            variables: { productID, },
        });

        /****  Initial State    *****/
        client.query({
            query: GetAllProductInfoQuery,
            variables: { productID, },
            fetchPolicy: "cache-only"
        }).then(res => {
            console.log("early", res.data);
            const {productById} = res.data as GetAllProductInfo.Query;
            if(productById) {
                this.setState({
                    product: _.defaultsDeep(productById, this.state.product)
                })
            }
        });
        this.state = {
            product: null
        }
    }

    /*****  Lifecycle Handlers    *****/
    public componentDidMount() {
        this.subscriptions = [
            this.GetAllProductInfoQuery.subscribe({
                next: (res) => {
                    const {productById} = res.data as GetAllProductInfo.Query;
                    if(productById) {
                        this.setState({
                            product: _.defaultsDeep(productById, this.state.product)
                        })
                    }
                },
                error: (err) => {
                    //TODO add notification
                  console.log(err);
                }
            }),
        ];
    }

    public componentWillUnmount() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
        console.log("Unmount!");
    }

    /*****      Render          *****/
    public render() {
        const {product} = this.state;
        const {section} = this.props;
        if(!product) return <div/>;

        return (
            <ProductPageComponent product={product} section={section}/>
        );
    }
}

export default withApollo(Container);