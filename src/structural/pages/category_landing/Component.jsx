import React from 'react';
import injectSheet from 'react-jss';


import CategoryCard from './CategoryCardComponent';


const styles = {

};


const CategoryLanding = (props) => {
    const {classes} = props;
    return (
        <div>
            <CategoryCard title={"test"} description={"This is my really cool test."}/>
        </div>
    )
};


export default injectSheet(styles)(CategoryLanding);
