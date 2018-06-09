// @flow
import React from 'react';
import {TextField, Divider, Typography} from '@material-ui/core';
import type {ComponentType} from 'react';
import injectSheet from 'react-jss';

/****  TYPES ******/
type ClassProp = {
    classes: {[$Keys<typeof styles>]: string}
}

type ComponentProps = {
}


/****  COMPONENT ******/
class Component extends React.PureComponent<ComponentProps & ClassProp>{

    render() {

        const {classes} = this.props;
        return (
            <form>
                <Typography variant={"title"}> Basic Info</Typography>
                <LocalTextField label={"Name"} value={"Jack Langston"} classes={classes}/>
                <LocalTextField label={"Name"} value={"Jack Langston"} classes={classes}/>
                <LocalTextField label={"Name"} value={"Jack Langston"} classes={classes}/>
                <LocalTextField label={"Name"} value={"Jack Langston"} classes={classes}/>
                <LocalTextField label={"Name"} value={"Jack Langston"} classes={classes}/>
                <Divider className={classes.divider}/>
                <Typography variant={"title"}> Contact Info</Typography>
                <LocalTextField label={"Name"} value={"Jack Langston"} classes={classes}/>
                <LocalTextField label={"Name"} value={"Jack Langston"} classes={classes}/>
                <LocalTextField label={"Name"} value={"Jack Langston"} classes={classes}/>
                <LocalTextField label={"Name"} value={"Jack Langston"} classes={classes}/>
            </form>
        );
    };
}

const LocalTextField = (props) => {
    const {classes, label, value} = props;

    return (
        <TextField
            className={classes.field}
            disabled={true}
            label={label}
            value={value}
            InputProps={{
                disableUnderline: true,
                classes: {
                    input: classes.input,
                    formControl: classes.inputControl
                }
            }}
            InputLabelProps={{
                classes: {shrink: classes.label}
            }}
        />
    )
};



/****  STYLES ******/
const styles = {
    field: {
        display: "flex",
        flexDirection: "row",
        margin: "10px 0"
    },
    label: {
        position: "static",
        transform: "none",
        lineHeight: "1.1875em",
        width: "150px"
    },
    input: {
        color: "black",
        padding: 0
    },
    inputControl: {
        marginTop: [0, "!important"]
    },
    divider: {
        margin: "20px 0"
    }
};


/****  EXPORT ******/
export default (injectSheet(styles)(Component): ComponentType<ComponentProps>)