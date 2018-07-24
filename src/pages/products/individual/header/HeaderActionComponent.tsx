import {
    Button,
    createStyles,
    IconButton,
    TextField,
    Theme,
    Typography,
    WithStyles,
    withStyles
} from "@material-ui/core";
import * as React from "react";
import * as numeral from "numeral";


/****  TYPES ******/
interface IHeaderActionComponentProps extends WithStyles<typeof styles> {
    usdCost: number;
}


/****  COMPONENT ******/
class HeaderActionComponent extends React.PureComponent<IHeaderActionComponentProps> {


    public render() {

        const {
            classes,
            usdCost,
        } = this.props;


        return (
            <div className={classes.container}>
                <Typography variant={"subheading"}>
                    Price: {numeral(usdCost).format("$0,0.00")}
                </Typography>

                <TextField
                    className={classes.cartCounter}
                    id={"jack"}
                    label="Quantity"
                    type="number"
                    defaultValue={1}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    autoComplete={"off"}
                />

                <Button
                    className={classes.addToCartButton}
                    variant={"outlined"}
                >
                    Add to Cart
                </Button>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = (theme: Theme) => (createStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        boxShadow: "3px 3px 11px -6px rgba(0,0,0,0.75)",
        height: "100%",
        padding: "10px",
        boxSizing: "border-box",
        backgroundColor: theme.palette.background.default
    },
    cartCounter: {
        width: "100px",
    },
    addToCartButton: {
        alignSelf: "center"
    }
}));

/****  EXPORT ******/
export default withStyles(styles)(HeaderActionComponent);
