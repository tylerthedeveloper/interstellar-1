import {
    createStyles,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle, Icon, Tab, Tabs,
    Theme, Typography,
    WithStyles,
    withStyles,
} from "@material-ui/core";
import * as React from "react";
import Dropzone from "react-dropzone";

/****  TYPES ******/
import { GetAllProductInfo } from "GQLTypes";
import { CreateProductPicMutationHandlerVars, UpdateProductPicMutationHandlerVars } from "./ImageUploadDialogContainer";
interface IImageUploadDialogComponentProps extends WithStyles<typeof styles> {
    open: boolean;
    handleClose: () => void;
    images: GetAllProductInfo.Nodes[];
    newProductImageHandler: (variables: CreateProductPicMutationHandlerVars) => void;
    updateProductImageHandler: (variables: UpdateProductPicMutationHandlerVars) => void;
}

/****  COMPONENT ******/
class ImageUploadDialogComponent extends React.Component<IImageUploadDialogComponentProps> {

    public state: {
        imageNum: number;
        currentImage: {productId: string; imageKey: string, imageNum: number} | null;
    };

    public constructor(props: IImageUploadDialogComponentProps) {
        super(props);

        this.state = {
            imageNum: 0,
            currentImage: props.images[0],
        };
    }

    public render() {

        const { classes, open, handleClose, images, newProductImageHandler, updateProductImageHandler } = this.props;
        const {imageNum} = this.state;

        // get the current image from the image array
        let currentImage;
        if (imageNum < images.length) {
            currentImage = images[imageNum];
        } else {
            currentImage = null;
        }

        // create the tabs for switching between interfaces
        const tabs = images.map(({imageKey, imageNum}, i) => {
            return <Tab key={imageKey} label={i == 0 ? "Main Image" : `Image ${imageNum}`} className={classes.imageSelector}/>;
        });
        if (tabs.length < 5) {
            tabs.push(<Tab key={"new-image"} label="Add a New Image" className={classes.imageSelector}/>);
        }

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
                        <li><Typography>{"Must be <= 5MB and >= 100kB"}</Typography></li>
                    </ul>
                </DialogContent>
                <div className={classes.dropzoneContainer}>
                    <Dropzone
                        className={classes.dropzone}
                        accept={["image/jpeg", "image/png"] as any}
                        onDrop={(acceptedFiles, rejectedFiles) => {

                            // new images
                            if (this.state.imageNum + 1 === tabs.length) {
                                newProductImageHandler({
                                    file: acceptedFiles[0],
                                    num: this.state.imageNum,
                                });

                            // replacing images
                            } else {
                                updateProductImageHandler({
                                    file: acceptedFiles[0],
                                    num: this.state.imageNum,
                                });
                            }
                        }}
                    >
                        {currentImage ?
                            <picture>
                                <source
                                    srcSet={`https://silentshop.s3.amazonaws.com/${currentImage.imageKey}-lg.webp`}
                                    type="image/webp"
                                />
                                <img
                                    className={classes.image}
                                    src={`https://silentshop.s3.amazonaws.com/${currentImage.imageKey}-lg.jpeg`}
                                />
                            </picture>
                            :
                            <div className={classes.newImageBox}>
                                <Typography variant={"subheading"} align={"center"}>
                                    Click or Drop Here
                                </Typography>
                            </div>
                        }
                        <Icon className={"material-icons"} classes={{ root: classes.edit }}>
                            edit
                        </Icon>
                    </Dropzone>
                </div>
                <DialogContent className={classes.tabContainer}>
                    <Tabs
                        value={this.state.imageNum}
                        onChange={(_, val) => {
                            this.setState({imageNum: val});
                        }}
                        indicatorColor="primary"
                        textColor="primary"
                        centered={true}
                    >
                        {tabs}
                    </Tabs>
                </DialogContent>

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
        display: "flex",
        justifyContent: "center",
    },
    dialog: {
        minWidth: "600px",
        maxWidth: "850px",
    },
    imageSelector: {
        minWidth: "50px",
    },

    dropzone: {
        borderRadius: "10px",
        cursor: "pointer",
        display: "inline",
    },
    image: {
        objectFit: "contain",
        maxHeight: "500px",
        borderRadius: "10px",
        border: "2px dotted" + theme.palette.grey.A100,

    },
    edit: {
        position: "absolute",
        right: "-15px",
        bottom: "-15px",
        borderRadius: "50%",
        fontSize: "30px",
        color: "white",
        background: theme.palette.primary.main,
        padding: "10px",
    },
    newImageBox:  {
        minHeight: "300px",
        width: "300px",
        border: "2px dotted" + theme.palette.grey.A100,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    tabContainer: {
        marginTop: "15px",
    },
}));

/****  EXPORT ******/
export default withStyles(styles)(ImageUploadDialogComponent);
