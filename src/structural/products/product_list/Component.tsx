import * as React from "react";
import { Typography, TextField, List, WithStyles, withStyles, createStyles } from "@material-ui/core";

import ProductListItem from "./ProductListItemComponent";

/****  TYPES ******/
import { PresentableProduct } from "./PresentableProductType";
interface ComponentProps extends WithStyles<typeof styles> {
    products : PresentableProduct[]
}

/****  COMPONENT ******/
class Component extends React.PureComponent<ComponentProps> {
    render() {
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
        width: "100%"
    }
});

/****  EXPORT ******/
export default withStyles(styles)(Component);
