import React from 'react';
import {Typography, TextField, List} from '@material-ui/core';
import injectSheet from 'react-jss';

import ProductListItem from './ProductListItemComponent';


const products = [
    {
        name: "Product 1",
        price: 20,
        description: "This is a product."
    },
    {
        name: "Product 2",
        price: 10,
        description: "This is a product."
    },
    {
        name: "Product 3",
        price: 2022,
        description: "This is a product."
    },
    {
        name: "Product 4",
        price: 25,
        description: "This is a product."
    },
    {
        name: "Product 5",
        price: 2,
        description: "This is a product."
    },
];



const styles = {
    container: {
      padding: "20px 250px 0"
    },
    header: {
        display: "flex"
    },
    content : {
        display: "flex",
        marginTop: "20px"
    },
    title: {
        flex: 1
    },
    search: {
        width: "25%",
        transition: "all 0.5s ease",
        "&:focus-within": {
            width: "600px"
        }
    },
    searchInput: {
        width:"100%"
    },
    filters: {
        width: "25%",
        height: "500px",
        backgroundColor: "lightgrey",
        display: "inline-block"
    },
    items: {
        flex: 1,
        paddingRight: "30px"
    }
};


const CategoryLanding = (props) => {
    const {classes} = props;
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography variant={"display2"} className={classes.title}>
                    Odds & Ends
                </Typography>
                <form className={classes.search}>
                    <TextField className={classes.searchInput}

                        id={"search"}
                        label={"Search"}
                        placeholder={"Search..."}
                    />
                </form>
            </div>
            <div className={classes.content}>
                <List className={classes.items} component={"div"}>
                    {
                        products.map((props) => {
                            return (
                                <ProductListItem key={props.name} {...props}/>
                            )
                        })
                    }
                </List>
                <div className={classes.filters}>
                    Filters to go here
                </div>
            </div>

        </div>
    )
};

export default injectSheet(styles)(CategoryLanding);
