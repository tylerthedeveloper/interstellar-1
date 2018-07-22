import {
    AppBar,
    Avatar,
    Button,
    createStyles,
    Icon,
    Toolbar,
    Typography,
    WithStyles,
    withStyles,
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { NavLink } from "react-router-dom";
import UIStore from "Stores/ui";
import { injectWithTypes } from "TypeUtil";
import NavButton from "./NavButtonComponent";

/****  TYPES ******/

interface IComponentProps extends WithStyles<typeof styles> {
    logout: () => void;
    currentUserID: string | null;
    ui: UIStore;
}

/****  COMPONENT ******/
@observer
class NavBar extends React.Component<IComponentProps> {
    public render() {
        const { classes, ui, currentUserID, logout } = this.props;
        return (
            <AppBar position="static" key={"app-bar"}>
                <Toolbar>
                    <Typography variant="display1" className={classes.logo}>
                        Interstellar_Logo
                    </Typography>
                    <div className={classes.navSection}>
                        <NavButton to="/">Home</NavButton>
                        <NavButton to="/categories">Products</NavButton>
                        <NavButton to="/people">Sellers</NavButton>
                    </div>
                    <div>
                        {currentUserID ? (
                            <div className={classes.userNavSection}>

                                <Button
                                    component={(props: any) => <NavLink to={"/people/" + currentUserID} {...props}/>}
                                    className={classes.userNavSectionItem}
                                >
                                    <Avatar
                                    >
                                        OP
                                    </Avatar>
                                </Button>
                                <Button
                                    className={classes.userNavSectionItem}
                                    variant={"raised"}
                                    component={(props: any) => <NavLink to={"/cart"} {...props}/>}
                                >
                                    <Icon className={"material-icons"}>
                                        shopping_cart
                                    </Icon>
                                </Button>
                                <Button
                                    onClick={logout}
                                    variant={"raised"}
                                    className={classes.userNavSectionItem}
                                    color={"secondary"}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={ui.openLoginModal}
                                variant={"raised"}
                            >
                                Login / Sign Up
                            </Button>
                        )}

                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    logo: {
        color: "white",
        marginRight: "25px",
    },

    navSection: {
        flex: 1,
    },

    userNavSectionItem: {
        margin: "0 10px",
        padding: "0 8px",
    },

    userNavSection: {
        display: "flex",
    },
});

/****  EXPORT ******/
export default injectWithTypes("ui", withStyles(styles)(NavBar));
