import {
    createStyles,
 Theme, Typography, WithStyles, withStyles
} from "@material-ui/core";
import * as React from "react";
import Avatar from "Structural/avatar/Component";
import ActionBar from "./action_bar/Component";
import MainContent from "./ProfileContentComponent";
import UploaderDialog from "./UploaderDialogComponent";

/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {
    user: any;
    editable: boolean;
    profilePicUploadHandler: (variables:{userID: string, file: any}) => void;
}


/****  COMPONENT ******/
class Component extends React.PureComponent<IComponentProps> {
    public render() {

        const {
            user: {id: userID, website, profilePicture, displayName, username},
            classes,
            editable,
        } = this.props;

        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    {editable ?
                        <UploaderDialog {...this.props}/>
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
        position: "relative",
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
    }
}));

/****  EXPORT ******/
export default withStyles(styles)(Component);
