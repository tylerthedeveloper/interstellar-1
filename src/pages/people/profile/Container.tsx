import * as React from "react";

import GetAllUserInfoQuery from "Query/GetAllUserInfo";
import GetCurrentUserIdQuery from "Query/GetCurrentUserId";
import UpdateProfilePicMutation from "Mutation/UpdateProfilePic";
import ProfileComponent from "./Component";

/***        Types       ***/
import { ApolloClient, ObservableQuery } from "apollo-client";
import { withApollo, WithApolloClient } from "react-apollo";
import { injectWithTypes } from "TypeUtil";
import UIStore from "Stores/ui";

interface IContainerProps {
    userID: string;
    ui: UIStore;
}
type IContainerPropsWithApollo = WithApolloClient<IContainerProps>;

type UpdateProfilePicMutationHandlerVars = {
    userID: string
    file: File
}

/***        Component       ***/
class Container extends React.PureComponent<IContainerPropsWithApollo> {

    private subscriptions: ZenObservable.Subscription[];
    private GetAllUserInfoQuery: ObservableQuery<any>;
    private GetCurrentUserIdQuery: ObservableQuery<any>;
    private client: ApolloClient<any>;
    private ui: UIStore;
    public state: {
        currentUserID?: string;
        user: {
            id: string,
            website?: string | null,
            profilePicture?: string | null,
        };
    };

    constructor(props: IContainerPropsWithApollo) {
        super(props);
        const { client, userID, ui} = props;
        this.client = client;
        this.ui = ui;

        /*****  Set Up Subscriptions    *****/
        this.GetAllUserInfoQuery = client.watchQuery({
            query: GetAllUserInfoQuery,
            variables: { userID, },
        });
        this.GetCurrentUserIdQuery = client.watchQuery({
            query: GetCurrentUserIdQuery,
        });

        /****  Initial State    *****/
        this.state = {
            user: {id: userID},
        }
    }

    /*****  Mutation Handlers    *****/
    public UpdateProfilePicMutationHandler( { 
        userID,
        file
    }: UpdateProfilePicMutationHandlerVars){

        const url = URL.createObjectURL(file);
        const img = new Image();
        img.src = url;
        img.onload = () => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            const size = file.size;

            if (size < 50000) {
                this.ui.displayNotification("File must be larger than 50kB!", { type: "error" });
                return;
            } else if (size > 2000000) {
                this.ui.displayNotification("File must be smaller than 2MB!", { type: "error" });
                return;
            } else if (width < height * .75 || width > height * 1.25) {
                this.ui.displayNotification("File must be roughly square!", { type: "error" });
                return;
            }

            this.ui.displayNotification("Photo uploading...", { keepOpen: true, type: "loading" });


            this.client.mutate({
                mutation: UpdateProfilePicMutation,
                variables: { userID, file, },
            }).then(() => {
                this.ui.displayNotification("Upload complete!");
            }).catch((err) => {
                //TODO What to do on mutation error?
            });
        };
    }

    /*****  Lifecycle Handlers    *****/
    public componentDidMount() {
        this.subscriptions = [
            this.GetAllUserInfoQuery.subscribe({
                next: (res) => {
                    if (res.data && res.data.currentUser && res.data.currentUser.id) {
                        this.setState({currentUserID: res.data.currentUser.id});
                    } else {
                        this.setState({currentUserID: null});
                    }
                }
            }),
            this.GetCurrentUserIdQuery.subscribe({
                next: (res) => {
                    if (res.data && res.data.userById) {
                        this.setState({
                            user: {...this.state.user, ...res.data.userById},
                        });
                    }
                }
            }),
        ];
    }

    public componentWillUnmount() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    /*****      Render          *****/
    public render() {
        const {currentUserID, user} = this.state;

        return (
            <ProfileComponent
                user={user}
                editable={Boolean(currentUserID && user.id === currentUserID)}
                profilePicUploadHandler={this.UpdateProfilePicMutationHandler}
            />
        );
    }
}

export default injectWithTypes(["ui"], withApollo(Container));