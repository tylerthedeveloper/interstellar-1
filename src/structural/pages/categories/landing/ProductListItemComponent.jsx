import React from 'react';
import {Typography, ListItem, Grid, TextField, IconButton, Icon} from '@material-ui/core';
import injectSheet from 'react-jss';


const styles = {

    container: {
        display: "flex"
    },
    image: {
        display: "inline-block",
        height: "100px",
        background: "lightgrey"
    },
    descriptionBox: {
        paddingLeft:"20px",
    },
    cartCounter: {
        width: "100px",
        marginRight: "25px"
    }
};




class ProductListItem extends React.PureComponent {


    constructor(props) {
        super(props);
        this.onclickForm = this.onclickForm.bind(this);
    }

    //stop the ripple effect when clicking on the add to cart form
    onclickForm(event) {
        event.stopPropagation();
    };


    render() {
        const {classes, name, price, description} = this.props;
        return (
            <ListItem divider button>
                <Grid container>
                    <Grid item xs={2} className={classes.image}>
                        Image Here
                    </Grid>
                    <Grid item xs={7} className={classes.descriptionBox}>
                        <Typography variant={"title"}>
                            {name}
                        </Typography>
                        <Typography variant={"body1"}>
                            {description}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant={"subheading"}>
                            Price: {price}
                            <form onMouseDown={this.onclickForm}>
                                <TextField
                                    className={classes.cartCounter}
                                    id="number"
                                    label="Add to Cart"
                                    type="number"
                                    defaultValue={1}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                />
                                <IconButton className={"material-icons"}>shopping_cart</IconButton>
                            </form>
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
        )
    };
}


export default injectSheet(styles)(ProductListItem);
