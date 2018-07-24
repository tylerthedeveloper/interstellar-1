import { AppBar, createStyles, Tab, Tabs, Theme, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import { NavLink } from "react-router-dom";

import Description from './description/Component';


/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {
    productID: string;
    section?: string;
    productDescription: string;
}


/****  COMPONENT ******/
class Component extends React.PureComponent<IComponentProps> {


    public render() {

        const {
            classes,
            productID,
            productDescription,
        } = this.props;

        const section = this.props.section || "description";

        let innerComponent;
        switch (section) {
            case "description":
                innerComponent = <Description productDescription={productDescription}/>;
                break;
            case "reviews":
                innerComponent = <div/>;
                break;
            case "seller":
                innerComponent = <div/>;
        }

        return (
            <div>
                <AppBar position={"static"} className={classes.tabs}>
                    <Tabs value={section}>
                        <Tab
                            value="description"
                            label="Description"
                            component={(buttonProps: any) => (
                                <NavLink
                                    to={`/product/${productID}/description`}
                                    {...buttonProps}
                                />)}
                        />
                        <Tab
                            value="reviews"
                            label="Reviews"
                            component={(buttonProps: any) => (
                                <NavLink
                                    to={`/product/${productID}/reviews`}
                                    {...buttonProps}
                                />)}
                        />
                        <Tab
                            value="seller"
                            label="Seller Information"
                            component={(buttonProps: any) => (
                                <NavLink
                                    to={`/product/${productID}/seller`}
                                    {...buttonProps}
                                />)}
                        />
                    </Tabs>
                </AppBar>
                {innerComponent}
            </div>
        );
    }
}

/****  STYLES ******/
const styles = (theme: Theme) => (createStyles({
    tabs: {
        marginBottom: "20px",
    },
}));

/****  EXPORT ******/
export default withStyles(styles)(Component);
