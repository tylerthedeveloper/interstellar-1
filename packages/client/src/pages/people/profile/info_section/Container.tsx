import { LinearProgress } from "@material-ui/core";
import gql from "graphql-tag";
import * as React from "react";
import InfoSectionComponent from "./Component";

/***        Types       ***/
import { ObservableQuery } from "apollo-client";
import { withApollo, WithApolloClient } from "react-apollo";

interface IComponentProps {
    userID: string;
    editable: boolean;
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
        ];
    }

    public componentWillUnmount() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public render() {
        const {editable} = this.props;
        const {user} = this.state;
        if (!user) {
            return <LinearProgress />;
        }

        return (
            <InfoSectionComponent user={user} editable={editable}/>
        );
    }
}

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
