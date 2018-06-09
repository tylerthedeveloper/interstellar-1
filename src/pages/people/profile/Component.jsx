// @flow
import React from "react";
import {
    Avatar,
    Typography,
    Button,
    Tab,
    Tabs,
    AppBar
} from "@material-ui/core";
import { NavLink, Switch, Route } from "react-router-dom";
import type { ComponentType } from "react";
import injectSheet from "react-jss";

import ProductList from "../../../structural/products/product_list/Component";
import InfoSection from "./InfoSectionComponent";

/****  TYPES ******/
type ClassProp = {
    classes: { [$Keys<typeof styles>]: string }
};

type ComponentProps = {
    name?: string,
    match: {
        params: {
            id: string,
            section: string
        }
    }
};

/****  COMPONENT ******/
class Component extends React.PureComponent<ComponentProps & ClassProp> {
    render() {
        const data = {
            name: "Jack Langston"
        };

        let {
            classes,
            match: {
                params: { id, section }
            }
        } = this.props;
        if (!section) {
            section = "sales";
        }
        const { name } = data;

        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    <Avatar className={classes.avatar}>OP</Avatar>
                    <div>
                        <Typography variant={"display2"}>
                            Person {id}
                        </Typography>
                        <div className={classes.actionRow}>
                            <LocalButton className={classes.action}>
                                Contact
                            </LocalButton>
                            <LocalButton className={classes.action}>
                                Website
                            </LocalButton>
                            <LocalButton
                                className={classes.action}
                                color={"secondary"}
                            >
                                Report
                            </LocalButton>
                        </div>
                    </div>
                </div>
                <div className={classes.mainContent}>
                    <AppBar position={"static"} className={classes.tabs}>
                        <Tabs value={section}>
                            <Tab
                                variant={"outlined"}
                                value="sales"
                                label="Items for Sale"
                                component={NavLink}
                                to={`/people/${id}/sales`}
                            />
                            <Tab
                                value="reviews"
                                label="Reviews"
                                component={NavLink}
                                to={`/people/${id}/reviews`}
                            />
                            <Tab
                                value="info"
                                label="Information"
                                component={NavLink}
                                to={`/people/${id}/info`}
                            />
                        </Tabs>
                    </AppBar>
                    <Switch>
                        <Route
                            exact
                            path={"/people/:id/(sales)?"}
                            component={ProductList}
                        />
                        <Route
                            path={"/people/:id/reviews"}
                            component={filler}
                        />
                        <Route
                            path={"/people/:id/info"}
                            component={InfoSection}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}
const filler = (props) => {
    return <div>Needs to be implemented</div>;
};

const LocalButton = (props) => {
    return <Button variant={"raised"} {...props} />;
};

/****  STYLES ******/
const styles = {
    header: {
        display: "flex",
        marginBottom: "30px"
    },

    mainContent: {},

    actionRow: {
        paddingTop: "20px",
        display: "flex"
    },
    action: {
        marginRight: "20px"
    },

    avatar: {
        width: "150px",
        height: "150px",
        marginRight: "30px"
    },

    container: {
        padding: "20px 250px 0"
    },
    tabs: {
        marginBottom: "20px"
    }
};

/****  EXPORT ******/
export default (injectSheet(styles)(Component): ComponentType<ComponentProps>);
