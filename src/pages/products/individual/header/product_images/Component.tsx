import { createStyles, Icon, Theme, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";

import UploadDialog from './ImageUploadDialogContainer';

/****  TYPES ******/
interface IProductImagesComponentProps extends WithStyles<typeof styles> {
    images: {productId?: string; imageKey?: string, imageNum: number}[];
    productID: string;
}


/****  COMPONENT ******/
class Component extends React.Component<IProductImagesComponentProps> {

    public state: {
        open: boolean;
    }

    constructor(props: IProductImagesComponentProps){
        super(props);

        this.state = {
            open: false
        }
    }

    public onClickHandler = () => {
        this.setState({
            open: true
        })
    }

    public onCloseHanler = () => {
        this.setState({
            ...this.state,
            open: false
        })
    }


    public render() {
        const {classes, images, productID} = this.props;
        const imageKey = images.length > 0 ? images[0].imageKey : null;
        return (
            <div className={imageKey ? classes.imageContainerFull : classes.imageContainerEmpty}>
                {imageKey ?
                    <picture >
                        <source
                            srcSet={`https://silentshop.s3.amazonaws.com/${imageKey}-lg.webp`}
                            type="image/webp"
                        />
                        <img
                            className={classes.image}
                            onClick={this.onClickHandler}
                            src={`https://silentshop.s3.amazonaws.com/${imageKey}-lg.jpeg`}
                        />
                    </picture>
                    : null}
                <Icon className={"material-icons"} classes={{ root: classes.edit }} onClick={this.onClickHandler}>
                    edit
                </Icon>
                <UploadDialog
                    images={images}
                    productID={productID}
                    open={this.state.open}
                    handleClose={this.onCloseHanler}
                />
            </div>
        );
    }
}

/****  STYLES ******/
const styles = (theme: Theme) => (createStyles({
    image: {
        height: "100%",
        width: "100%",
        maxHeight: "400px",
        objectFit: "contain",
        borderRadius: "15px"

    },
    imageContainerFull: {
        width: "100%",
        height: "100%",
        minHeight: "250px",
        position: "relative",
        cursor: "pointer",
        marginBottom: "10px",
        borderRadius: "10px"
    },
    imageContainerEmpty: {
        width: "100%",
        height: "100%",
        minHeight: "250px",
        position: "relative",
        cursor: "pointer",
        marginBottom: "10px",
        borderRadius: "10px",
        background: theme.palette.grey.A100
    },
    edit: {
        position: "absolute",
        right: "-15px",
        bottom: "-5px",
        borderRadius: "50%",
        fontSize: "30px",
        color: "white",
        background: theme.palette.primary.main,
        padding: "10px",
    },
}));

/****  EXPORT ******/
export default withStyles(styles)(Component);
