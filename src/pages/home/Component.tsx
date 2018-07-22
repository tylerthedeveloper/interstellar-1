import { createStyles, Typography, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import injectSheet from "react-jss";

/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {}

/****  COMPONENT ******/
class Home extends React.PureComponent<IComponentProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Typography variant={"display3"}>Home Page</Typography>
                <ul>
                    <li>Secret Key (Public Network): SB6ZKPBDEWFQ7CGV7IPV3QUBU6MSR232LWHOIURIHPHICOSWCAPEQDSC</li>
                    <li>Secret Key (Test Network): SAKRB7EE6H23EF733WFU76RPIYOPEWVOMBBUXDQYQ3OF4NF6ZY6B6VLW</li>
                </ul>
                <TestUpload/>
            </div>
        );
    }
}

import gql from "graphql-tag";
import { graphql } from "react-apollo";

const TestUpload =  graphql(gql`
    mutation($file: Upload!) {
        uploadFile(file: $file) {
            id
        }
    }
`)(({ mutate }) => (
    <input
        type="file"
        required={true}
        onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
                mutate!({variables: {file: event.target.files[0]}});
            }
        }}
    />
));

/****  STYLES ******/
const styles = createStyles({
    container: {
        padding: "20px 250px 0",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(Home);
