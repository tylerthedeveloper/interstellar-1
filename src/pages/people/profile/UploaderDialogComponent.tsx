import {
    createStyles, Dialog, DialogContent, DialogContentText, DialogTitle, Icon,
    Theme, Typography, WithStyles, withStyles,
} from "@material-ui/core";
import * as React from "react";
import Dropzone from "react-dropzone";
import Avatar from "Structural/avatar/Component";

/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {
    user: any;
    editable: boolean;
    profilePicUploadHandler: ({}:{userID: string, file: any}) => void;
}

class UploaderDialog extends React.PureComponent<IComponentProps> {

    public state: {
        open: boolean;
    };

    constructor(props: IComponentProps) {
        super(props);

        this.state = {
            open: false,
        };
    }

    public handleClose = () => {
        this.setState({
            open: false,
        });
    }

    public handleAvatarClick = () => {
        this.setState({
            open: true,
        });
    }

    public render() {
        const { classes, profilePicUploadHandler, user: { userID, profilePicture, displayName } } = this.props;
        const { open } = this.state;
        return (
            <div>
                <div className={classes.avatarChanger} onClick={this.handleAvatarClick}>
                    <Avatar
                        profilePicture={profilePicture}
                        displayName={displayName}
                        className={classes.avatar}
                    />
                    <Icon className={"material-icons"} classes={{ root: classes.edit }}>
                        edit
                    </Icon>
                </div>
                <Dialog
                    aria-labelledby="upload-profile-picture"
                    classes={{paperWidthSm: classes.dialog}}
                    open={open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Upload new profile picture!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <ul>
                                <li>Must be roughly square</li>
                                <li>{"Must be <= 2MB and >= 50kB"}</li>
                            </ul>
                        </DialogContentText>
                    </DialogContent>
                    <div className={classes.dropzoneContainer}>
                        <Dropzone
                            className={classes.dropzone}
                            accept={["image/jpeg", "image/png"] as any}
                            onDrop={(acceptedFiles, rejectedFiles) => {
                                profilePicUploadHandler({userID, file: acceptedFiles[0]});
                            }}
                        >
                            <Typography variant={"headline"} align={"center"}>
                                Click or Drop Here
                            </Typography>
                        </Dropzone>
                    </div>
                </Dialog>
            </div>
        );
    }

}

/****  STYLES ******/
const styles = (theme: Theme) => (createStyles({

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

    dropzoneContainer : {
        width: "100%",
        boxSizing: "border-box",
        padding: "20px",
    },

    dropzoneButton: {

    },
    dialog: {
        width: "600px",
    },

    dropzone: {
        "width": "100%",
        "height": "300px",
        "border": "2px dotted " + theme.palette.grey.A100,
        "borderRadius": "10px",
        "cursor": "pointer",
        "&:hover": {
            background: theme.palette.grey.A100,
        },
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
    },
}));

export default withStyles(styles)(UploaderDialog);
