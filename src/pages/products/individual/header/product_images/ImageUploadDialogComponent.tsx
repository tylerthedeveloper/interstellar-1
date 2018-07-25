import {
    createStyles,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Theme, Typography,
    WithStyles,
    withStyles
} from "@material-ui/core";
import * as React from "react";
import Dropzone from "react-dropzone";


/****  TYPES ******/
interface IImageUploadDialogComponentProps extends WithStyles<typeof styles> {
    open: boolean;
    handleClose: () => void;
}


/****  COMPONENT ******/
class ImageUploadDialogComponent extends React.PureComponent<IImageUploadDialogComponentProps> {


    public render() {

        const { classes, open, handleClose } = this.props;

        return (
            <Dialog
                aria-labelledby="upload-profile-picture"
                classes={{paperWidthSm: classes.dialog}}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Upload new product image!</DialogTitle>
                <DialogContent>
                    <ul>
                        <li><Typography>Must be roughly square</Typography></li>
                        <li><Typography>{"Must be <= 5MB and >= 200kB"}</Typography></li>
                    </ul>
                </DialogContent>
                <div className={classes.dropzoneContainer}>
                    <Dropzone
                        className={classes.dropzone}
                        accept={["image/jpeg", "image/png"] as any}
                        onDrop={(acceptedFiles, rejectedFiles) => {
                            console.log("DROP!")
                        }}
                    >
                        <Typography variant={"headline"} align={"center"}>
                            Click or Drop Here
                        </Typography>
                    </Dropzone>
                </div>
            </Dialog>
        );
    }
}

/****  STYLES ******/
const styles = (theme: Theme) => (createStyles({
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
    }
}));

/****  EXPORT ******/
export default withStyles(styles)(ImageUploadDialogComponent);
