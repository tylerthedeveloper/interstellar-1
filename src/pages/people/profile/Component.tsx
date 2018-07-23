import {
    AppBar,
    Avatar,
    Button,
    createStyles, Icon,
    Tab,
    Tabs, Theme, Typography, WithStyles, withStyles,
} from "@material-ui/core";
import * as React from "react";
import Dropzone from "react-dropzone";
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
        console.log(`https://silentshop.s3.amazonaws.com/${profilePicture}`);

        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    {editable ?
                        <Dropzone
                            accept={["image/jpeg", "image/png"] as any}
                            className={classes.avatar}
                            onDrop={(acceptedFiles, rejectedFiles) => {
                                profilePicUploadHandler(userID, acceptedFiles[0]);
                            }}
                        >
                            <CustomAvatar
                                profilePicture={profilePicture}
                                displayName={displayName}

                            />
                            <Icon className={"material-icons"} classes={{root: classes.edit}}>
                                edit
                            </Icon>
                        </Dropzone>
                        :
                        <CustomAvatar
                            profilePicture={profilePicture}
                            displayName={displayName}

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

//Todo move to be a structural component
const CustomAvatarUnstyled = (props: any) => {

    const {profilePicture, displayName, classes} = props;

    if (profilePicture) {
        return (
            <Avatar
                className={classes.avatar}
                srcSet={profilePicture ? `https://silentshop.s3.amazonaws.com/${profilePicture}` : ""}
            />
        );
    } else {
        return (
            <Avatar
                className={classes.avatar}
            >
                {displayName ? displayName.substring(0, 2) : "NA"}
            </Avatar>
        );
    }

};

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

const CustomAvatar = withStyles(styles)(CustomAvatarUnstyled);

/****  EXPORT ******/
export default withStyles(styles)(Component);
