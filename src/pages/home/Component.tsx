import { createStyles, Typography, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";

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
            </div>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    container: {
        padding: "20px 250px 0",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(Home);
