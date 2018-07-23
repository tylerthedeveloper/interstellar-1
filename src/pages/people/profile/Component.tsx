import {
    createStyles, Icon,
    Tab,
    Tabs, Theme, Typography, WithStyles, withStyles,
} from "@material-ui/core";
import * as React from "react";
import Dropzone from "react-dropzone";
import Avatar from "Structural/avatar/Component";
import ActionBar from "./action_bar/Component";
import MainContent from "./ProfileContentComponent";

/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {
    user: any;
    editable: boolean;
    profilePicUploadHandler: (userID: string, file: any) => void;
}

/****  COMPONENT ******/
class Component extends React.PureComponent<IComponentProps> {
    public render() {

        const {user: {id: userID, website, profilePicture, displayName, username}, classes, editable, profilePicUploadHandler} = this.props;

        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    {editable ?
                        <Dropzone
                            accept={["image/jpeg", "image/png"] as any}
                            className={classes.avatarChanger}
                            onDrop={(acceptedFiles, rejectedFiles) => {
                                profilePicUploadHandler(userID, acceptedFiles[0]);
                            }}
                        >
                            <Avatar
                                profilePicture={profilePicture}
                                displayName={displayName}
                                className={classes.avatar}
                            />
                            <Icon className={"material-icons"} classes={{root: classes.edit}}>
                                edit
                            </Icon>
                        </Dropzone>
                        :
                        <Avatar
                            profilePicture={profilePicture}
                            displayName={displayName}
                            className={classes.avatar}

                        />}
                    <div>
                        <div className={classes.nameContainer}>
                            <Typography variant={"display3"}>
                                {displayName ? displayName : username}
                            </Typography>
                            {displayName ?
                                <Typography variant={"display1"} className={classes.usernameDisplay}>
                                    {username}
                                </Typography> : ""}
                        </div>
                        {editable ?
                            <ActionBar/>
                            :
                            <ActionBar
                                website={true}
                                report={true}
                                contact={true}
                            />
                        }
                    </div>
                </div>
                <MainContent id={userID} editable={editable}/>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = (theme: Theme) => (createStyles({
    header: {
        display: "flex",
        marginBottom: "30px",
    },
    avatar: {
        width: "150px",
        height: "150px",
        marginRight: "30px",
    },
    avatarChanger: {
        width: "150px",
        height: "150px",
        marginRight: "30px",
        cursor: "pointer",
    },
    nameContainer: {
        display: "flex",
        alignItems: "baseline",
    },
    container: {
        padding: "20px 250px 0",
    },
    usernameDisplay: {
        marginLeft: "20px",
    },

    edit: {
        position: "absolute",
        right: "0",
        bottom: "0",
        borderRadius: "50%",
        fontSize: "30px",
        color: "white",
        background: theme.palette.primary.main,
        padding: "10px",
    },
}));

/****  EXPORT ******/
export default withStyles(styles)(Component);
