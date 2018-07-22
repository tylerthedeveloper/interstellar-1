import { CircularProgress, Icon } from "@material-ui/core";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import {debounce, isNil} from "lodash";
import * as React from "react";
import { ChangeEvent } from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import TextFieldBase from "./TextFieldBase";

enum Status {
    OK,
    LOADING,
    SERVER_ERROR,
    CLIENT_ERROR,
}
interface IEditableTextField {
    label: string;
    value: string;
    userID: string;
    graphQLField: string;
    validationFn: (v: string) => string | null;
    serverErrorParser: (err: string, val?: string) => string | null;
    maxLength?: number;
}
//
type IEditableTextFieldWithApollo = WithApolloClient<IEditableTextField>;
class EditableTextField extends React.PureComponent<IEditableTextFieldWithApollo> {

    private client: ApolloClient<any>;
    public state: {
        currentValue: string;
        status: Status;
        errorMessage: string;
    };
    private createPatch: (value: string) => { username: string };
    private validate: (v: string) => string | null;
    private maxLength: number;
    private editUserInfoMutation: any;
    private userID: string;
    private label: string;
    private serverErrorParser: (err: string, val?: string) => (string | null);

    constructor(props: IEditableTextFieldWithApollo) {
        super(props);
        const {
            client,
            value,
            userID,
            graphQLField: field,
            maxLength,
            validationFn,
            label,
            serverErrorParser,
        } = props;

        if (!updateFragments.hasOwnProperty(field)) {
            throw new Error(`Unsupported GraphQL field in text field updator: ${field}`);
        }

        // non stateful assignments
        this.client = client;
        this.userID = userID;
        this.label = label;
        this.createPatch = (v: string) => {
            const ret: any = {};
            ret[field] = v;
            return ret;
        };
        this.validate = validationFn;
        this.serverErrorParser = serverErrorParser;
        this.maxLength = maxLength ? maxLength : 30;
        this.editUserInfoMutation = gql`
            mutation EditUserInfo($userID: UUID!, $patch: UserPatch!) {
                updateUserById(input: {id: $userID, userPatch: $patch}){
                    user {
                        id
                        ...Fragment
                    }
                }
            }
            ${(updateFragments as any)[field]}
        `;

        // initial stateful assignments
        this.state = {
            currentValue: value,
            status: Status.OK,
            errorMessage: "",
        };
    }

    public mutate = (userID: string, value?: string) => {

        // make sure this is an actual mutation request
        if (isNil(value) || this.state.currentValue === value) {
            return;
        }

        // validate length requirements
        if (value.length > this.maxLength) {
            this.setState({
                status: Status.CLIENT_ERROR,
                errorMessage: `${this.label} must only be ${this.maxLength} characters long!`,
            });
            return;
        }

        // validate regex requirements
        const validationError = this.validate(value);
        if (validationError) {
            this.setState({
                status: Status.CLIENT_ERROR,
                currentValue: value,
                errorMessage: validationError,
            });
            return;
        }

        this.setState({
            status: Status.LOADING,
            currentValue: value,
        });

        this.executeMutate(userID, value);
    }

    // debounce the function so it is only called after 1s without text entry
    // has occurred
    private executeMutate = debounce(((userID: string, value: string) => {

        // in case  we debounce a mutation after a server error, clear the error
        // when the debounce activates
        if (this.state.status === Status.SERVER_ERROR) {
            this.setState({
                status: Status.LOADING,
            });
        }

        // note in below that client errors always supercede server errors because
        // they are caught earlier in the async flow
        return this.client.mutate({
            mutation: this.editUserInfoMutation,
            variables:  {userID, patch: this.createPatch(value)},
        }).then(() => {
            if (this.state.status !== Status.CLIENT_ERROR) {
                this.setState({
                    status: Status.OK,
                });
            }
        }).catch((err) => {
            if (this.state.status !== Status.CLIENT_ERROR) {
                const parsedError = this.serverErrorParser(err.toString(), value);
                this.setState({
                    status: Status.SERVER_ERROR,
                    errorMessage: parsedError ? parsedError : "Error connecting to server. Please try again later!",
                });
            }
        });
    }), 1000, {leading: false, trailing: true});

    private inputHandler =  (event: ChangeEvent<HTMLInputElement>) => {this.mutate(this.userID, event.target.value); };

    public render() {

        const { label } = this.props;
        const {currentValue, status, errorMessage} = this.state;

        // get the adornment for the input field
        let adornment;
        switch (status) {
            case Status.LOADING:
                adornment = <CircularProgress size={25} />;
                break;
            case Status.SERVER_ERROR:
            case Status.CLIENT_ERROR:
                adornment = (
                    <Icon className={"material-icons"} color={"secondary"}>
                        highlight_off
                    </Icon>
                );
                break;
            default:
                adornment = null;
                break;
        }

        // get the server error
        const error = status === Status.SERVER_ERROR || status === Status.CLIENT_ERROR;
        return (
            <TextFieldBase
                label={label}
                value={currentValue}
                errorMessage={error ? errorMessage : null}
                inputHandler={this.inputHandler}
                adornment={adornment}
            />
        );

    }
}

/***    GraphQL     ***/
const updateFragments = {
    username: gql`
        fragment Fragment on User{
            username
        }
    `,
    displayName: gql`
        fragment Fragment on User{
            displayName
        }
    `,
    email: gql`
        fragment Fragment on User{
            email
        }
    `,
    website: gql`
        fragment Fragment on User{
            website
        }
    `,

};

export default withApollo(EditableTextField);
