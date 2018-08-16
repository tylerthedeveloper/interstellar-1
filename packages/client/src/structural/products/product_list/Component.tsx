import { createStyles, List, TextField, Typography, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";

import ProductListItem from "./ProductListItem";

/****  TYPES ******/
import { IPresentableProduct } from "../../../types/local/PresentableProductType";
interface IComponentProps extends WithStyles<typeof styles> {
    products: IPresentableProduct[];
    ActionComponent: React.ComponentType<{product?: IPresentableProduct}>;
}

/****  COMPONENT ******/
class Component extends React.PureComponent<IComponentProps> {
    public render() {
        const { classes, products, ActionComponent } = this.props;
        return (
            <List component={"div"} className={classes.listContainer}>
                {products.map((product) => {
                    return <ProductListItem key={product.id} product={product} ActionComponent={ActionComponent} />;
                })}
            </List>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    listContainer: {
        width: "100%",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(Component);
