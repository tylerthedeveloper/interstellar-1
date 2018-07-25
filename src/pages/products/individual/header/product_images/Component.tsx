import { createStyles, Icon, Theme, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";

import UploadDialog from './ImageUploadDialogComponent'

/****  TYPES ******/
interface IProductImagesComponentProps extends WithStyles<typeof styles> {}


/****  COMPONENT ******/
class Component extends React.PureComponent<IProductImagesComponentProps> {

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

        const {classes} = this.props;
        console.log(this.state.open);
        return (
            <div className={classes.imageContainer}>
                <div onClick={this.onClickHandler} className={classes.image}>
                    Need image here
                    <Icon className={"material-icons"} classes={{ root: classes.edit }}>
                        edit
                    </Icon>
                </div>
                <UploadDialog open={this.state.open} handleClose={this.onCloseHanler}/>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = (theme: Theme) => (createStyles({
    image: {
      height: "100%",
      width: "100%"
    },
    imageContainer: {
        width: "100%",
        height: "100%",
        background: "grey",
        minHeight: "250px",
        minWidth: "250px",
        position: "relative",
        cursor: "pointer",
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
}));

/****  EXPORT ******/
export default withStyles(styles)(Component);
