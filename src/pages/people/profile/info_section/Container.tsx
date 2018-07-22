import gql from "graphql-tag";
import * as React from "react";
import InfoSectionComponent from "./Component";

/***        Types       ***/
import { ObservableQuery } from "apollo-client";
import { withApollo, WithApolloClient } from "react-apollo";

interface IComponentProps {
    userID: string;
}
type IComponentPropsWithApollo = WithApolloClient<IComponentProps>;
interface IUser {
    id: string;
    displayName?: string;
    username: string;
    accountCreatedTimestamp: string;
    lastLoginTimestamp: string;
    website?: string;
    email?: string;
    stellarPublicKey: string;
}
class InfoSection extends React.PureComponent<IComponentPropsWithApollo> {

    private infoQuery: ObservableQuery<any>;
    private currentUserQuery: ObservableQuery<any>;
    public state: {
        user?: IUser,
        currentUserID?: string;
    };
    private subscriptions: ZenObservable.Subscription[];

    constructor(props: IComponentPropsWithApollo) {
        super(props);
        const {client, userID} = props;

        this.infoQuery = client.watchQuery({
            query,
            variables: {userID},
        });

        this.currentUserQuery = client.watchQuery({
            query: currentUserQuery,
        });

        this.state = {};
    }

    public componentDidMount() {
        this.subscriptions = [
            this.infoQuery
                .subscribe({
                    next: (res) => {
                        if (res.data && res.data.userById) {
                            this.setState({user: res.data.userById});
                        }
                    },
                }),

            this.currentUserQuery
                .subscribe({
                    next: (res) => {
                        if (res.data && res.data.currentUser && res.data.currentUser.id) {
                            this.setState({currentUserID: res.data.currentUser.id});
                        }
                    },
                }),
        ];
    }

    public componentWillUnmount() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public render() {
        const {user, currentUserID} = this.state;
        if (!user) {
            return <div/>;
        }

        return (
            <InfoSectionComponent user={user} editable={Boolean(currentUserID && user.id === currentUserID)}/>
        );
    }
}

const currentUserQuery = gql`
    query {
        currentUser {
            id
        }
    }
`;

const query = gql`
    query GetUserProfileDetails($userID: UUID!) {
        userById(id: $userID){
            id
            username
            stellarPublicKey
            displayName
            website
            email
            accountCreatedTimestamp
            lastLoginTimestamp
        }
    }
`;

export default withApollo(InfoSection);
