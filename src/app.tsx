import * as React from "react";
import { hot } from "react-hot-loader";
import { Route, Switch } from "react-router-dom";

import { createStyles, withStyles, WithStyles} from "@material-ui/core";
import Snackbar from "Structural/notification/Component";
import Cart from "./pages/cart/Container";
import Categories from "./pages/categories/Component";
import HomePage from "./pages/home/Component";
import People from "./pages/people/Component";
import LoginModal from "./structural/login/login_modal/Component";
import Navbar from "./structural/navbar/Container";
import Product from "./pages/products/individual/Container";

/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {}

/****  COMPONENT ******/
class App extends React.PureComponent<IComponentProps> {
    public render() {
        const { classes } = this.props;

        console.log("App updating!");
        return (
            <div className={classes.container}>
                <Navbar />
                <div className={classes.content}>
                    <Switch>
                        <Route path="/" exact={true} component={HomePage} />
                        <Route path="/categories" component={Categories} />
                        <Route path="/people" component={People} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/product/:id/:section?"
                               render={(props) => (
                                   <Product
                                       section={props.match.params.section}
                                       productID={props.match.params.id}
                                    />
                               )}
                        />
                    </Switch>
                </div>
                <LoginModal />
                <Snackbar />
            </div>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    container: {
        position: "absolute",
        height: "100%",
        width: "100%",
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
    },
    content: {
        padding: "20px",
    },
});

export default hot(module)(withStyles(styles)(App));
