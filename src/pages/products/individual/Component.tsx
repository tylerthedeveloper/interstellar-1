import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";

import Header from './header/Component';
import Content from './content/Component';


/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {
    section: string;
}


/****  COMPONENT ******/
class Component extends React.PureComponent<IComponentProps> {


    public render() {

        const { classes, section } = this.props;

        const product = {
            id: "123",
            name: "Super Awesome Product",
            shortDescription: `This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!`,
            description: `This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!
            This is a description! This is a description! This is a description! This is a description!`,
            usdCost: 123,
            rating: 3.5
        };

        return (
            <div className={classes.container}>
                <Header
                    productID={product.id}
                    productName={product.name}
                    usdCost={product.usdCost}
                    shortDescription={product.shortDescription}
                    rating={product.rating}
                />
                <div className={classes.padder}/>
                <Content
                    productID={product.id}
                    productDescription={product.description}
                    section={section}
                />
            </div>
        );
    }
}

/****  STYLES ******/
const styles = (theme: Theme) => (createStyles({
    container: {
        padding: "0 150px"
    },
    padder: {
        width: "100%",
        height: "20px"
    }
}));

/****  EXPORT ******/
export default withStyles(styles)(Component);
