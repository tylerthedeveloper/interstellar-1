import { createStyles, List, TextField, Typography, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";

import ProductListItem from "./ProductListItemComponent";

/****  TYPES ******/
import { IPresentableProduct } from "./PresentableProductType";
interface IComponentProps extends WithStyles<typeof styles> {
    products: IPresentableProduct[];
}

/****  COMPONENT ******/
class Component extends React.PureComponent<IComponentProps> {
    public render() {
        const { classes, products } = this.props;
        return (
            <List component={"div"} className={classes.listContainer}>
                {products.map((product) => {
                    return <ProductListItem key={product.id} product={product} />;
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
