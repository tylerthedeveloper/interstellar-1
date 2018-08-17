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
                    <li>Secret Key (Public Network): SCNJABWZFKPPY3FDLWQ763KQ37SWOHWZRH7N76Z35DTLQXDVCR4G5PU2</li>
                    <li>Secret Key (Test Network): SABZRD7PVLGVWI4MCNCEYZG6UJ6ROHMATCEMDA4OL4XYZFBHCYWQC4UW</li>
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
