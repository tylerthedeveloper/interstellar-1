import { LinearProgress } from "@material-ui/core";
import gql from "graphql-tag";
import * as React from "react";
import ProfileComponent from "./Component";

/***        Types       ***/
import { ObservableQuery } from "apollo-client";
import { withApollo, WithApolloClient } from "react-apollo";

interface IComponentProps {
    userID: string;
}
type IComponentPropsWithApollo = WithApolloClient<IComponentProps>;
class Profile extends React.PureComponent<IComponentPropsWithApollo> {

    private currentUserQuery: ObservableQuery<any>;
    public state: {
        currentUserID?: string;
    };
    private subscriptions: ZenObservable.Subscription[];

    constructor(props: IComponentPropsWithApollo) {
        super(props);
        const {client} = props;
        this.currentUserQuery = client.watchQuery({
            query,
        });

        this.state = {};
    }

    public componentDidMount() {
        this.subscriptions = [
            this.currentUserQuery
                .subscribe({
                    next: (res) => {
                        if (res.data && res.data.currentUser && res.data.currentUser.id) {
                            this.setState({currentUserID: res.data.currentUser.id});
                        } else {
                            this.setState({currentUserID: null});
                        }
                    },
                }),
        ];
    }

    public componentWillUnmount() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public render() {
        const {userID} = this.props;
        const {currentUserID} = this.state;
        return (
            <ProfileComponent userID={userID} editable={Boolean(currentUserID && userID === currentUserID)}/>
        );
    }
}

const query = gql`
    query {
        currentUser {
            id
        }
    }
`;

export default withApollo(Profile);
