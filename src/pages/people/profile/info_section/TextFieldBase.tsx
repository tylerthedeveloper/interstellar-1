import { createStyles, TextField, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";

/****  TYPES ******/
import { ChangeEvent, ReactElement } from "react";
interface IComponentProps extends WithStyles<typeof styles> {
    value: string;
    label: string;
    errorMessage?: string | null;
    inputHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
    adornment?: ReactElement<any> | null;

}

/****  COMPONENT ******/
class TextFieldBase extends React.PureComponent<IComponentProps> {
    public render() {
        const { classes, value, errorMessage, inputHandler, label, adornment }  = this.props;

        return (
            <TextField
                className={classes.field}
                label={label}
                disabled={!Boolean(inputHandler)}
                error={Boolean(errorMessage)}
                defaultValue={value}
                helperText={errorMessage ? errorMessage : ""}
                onChange={inputHandler}
                inputProps={{
                    size: value.length < 20 ? 23 : 1 + value.length * 1.1,
                }}
                InputProps={{
                    disableUnderline: !Boolean(inputHandler),
                    classes: {
                        input: classes.input,
                        formControl: classes.inputControl,
                    },
                    endAdornment: adornment,
                }}
                InputLabelProps={{
                    classes: { root: classes.label},
                }}
                FormHelperTextProps={{
                    classes: {
                        root: classes.helper,
                    },
                }}
            />
        );
    }
}

/***    Styles     ***/
const styles = createStyles({
    field: {
        display: "flex",
        flexDirection: "row",
        margin: "10px 0",
        flexWrap: "wrap",
    },
    label: {
        position: "static",
        transform: "none",
        lineHeight: "2em",
        width: "200px",
        minWidth: "200px",
    },
    input: {
        color: "black",
        padding: 0,
    },
    inputControl: {
        marginTop: "0 !important",
        marginRight: "10px",
        position: "relative",
    },
    helper: {
        width: "100%",
        marginLeft: "200px",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(TextFieldBase);
