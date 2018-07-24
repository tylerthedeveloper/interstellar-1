import gql from "graphql-tag";
import * as React from "react";
import ProfileComponent from "./Component";

/***        Types       ***/
import { ObservableQuery } from "apollo-client";
import ApolloClient from "apollo-client/ApolloClient";
import { withApollo, WithApolloClient } from "react-apollo";
import UIStore from "Stores/ui";
import { injectWithTypes } from "TypeUtil";

interface IComponentProps {
    userID: string;
    ui: UIStore;
}
type IComponentPropsWithApollo = WithApolloClient<IComponentProps>;
class Profile extends React.PureComponent<IComponentPropsWithApollo> {

    private currentUserQuery: ObservableQuery<any>;
    public state: {
        currentUserID?: string;
        user: {
            id: string,
            website?: string | null,
            profilePicture?: string | null,
        };
    };
    private subscriptions: ZenObservable.Subscription[];
    private client: ApolloClient<any>;
    private userInfoQuery: ObservableQuery<any>;
    private ui: UIStore;

    constructor(props: IComponentPropsWithApollo) {
        super(props);
        const {client, userID, ui} = props;
        this.client = client;
        this.currentUserQuery = client.watchQuery({
            query: currentUserQuery,
        });
        this.userInfoQuery = client.watchQuery({
            query: userInfoQuery,
            variables: {userID},
        });

        this.state = {
            user: {id: userID},
        };

        this.ui = ui;
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

            this.userInfoQuery
                .subscribe({
                    next: (res) => {
                        if (res.data && res.data.userById) {
                            this.setState({
                                user: {...this.state.user, ...res.data.userById},
                            });
                        }
                    },
                }),
        ];
    }

    public componentWillUnmount() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    private uploadProfilePic = (userID: string, file: File) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.src = url;
        img.onload = () => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            const size = file.size;

            if (size < 50000) {
                this.ui.displayNotification("File must be larger than 50kB!", {type: "error"});
                return;
            } else if (size > 2000000) {
                this.ui.displayNotification("File must be smaller than 2MB!", {type: "error"});
                return;
            } else if (width < height * .75 || width > height * 1.25) {
                this.ui.displayNotification("File must be roughly square!", {type: "error"});
                return;
            }

            this.ui.displayNotification("Photo uploading...", {keepOpen: true, type: "loading"});

            this.client.mutate({
                mutation: profilePicMutation,
                variables:  {userID, file},
            }).then(() => {
                this.ui.displayNotification("Upload complete!");
            }).catch((err) => {
                console.log(err);
            });
        };
    }

    public render() {
        const {currentUserID, user} = this.state;
        return (
            <ProfileComponent
                user={user}
                editable={Boolean(currentUserID && user.id === currentUserID)}
                profilePicUploadHandler={this.uploadProfilePic}
            />
        );
    }
}

const profilePicMutation = gql`
    mutation UpdateProfilePic($userID: UUID!, $file: Upload!) {
        updateUserById(input:{id: $userID, userPatch: {profilePicture: $file}}){
            user {
                id
                profilePicture
            }
        }
    }
`;

const currentUserQuery = gql`
    query {
        currentUser {
            id
        }
    }
`;

const userInfoQuery = gql`
    query GetUserInfo($userID: UUID!) {
        userById(id: $userID) {
            id
            website
            profilePicture
            displayName
            username
        }
    }
`;

export default injectWithTypes(["ui"], withApollo(Profile));
