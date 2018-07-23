import { Avatar, createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";

/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> , React.HTMLProps<HTMLPictureElement> {
    displayName?: string | null;
    profilePicture?: string | null;
    imageSize?: "lg" | "med" | "sm";
}

class CustomAvatar extends React.PureComponent<IComponentProps> {

    public render() {
        const {profilePicture, displayName, imageSize, classes, ...rest} = this.props;

        if (profilePicture) {
            return (
                <Avatar {...rest}>
                    <picture>
                        <source
                            srcSet={`https://silentshop.s3.amazonaws.com/${profilePicture}-${imageSize ? imageSize : "med"}.webp`}
                            type="image/webp"
                        />
                        <img
                            className={classes.avatarImage}
                            src={`https://silentshop.s3.amazonaws.com/${profilePicture}-${imageSize ? imageSize : "med"}.jpeg`}
                            alt={`${displayName}'s profile picture`}
                        />
                    </picture>
                </Avatar>
            );
        } else {
            return (
                <Avatar {...rest}>
                    {displayName ? displayName.substring(0, 2) : "NA"}
                </Avatar>
            );
        }

    }
}

/****  STYLES ******/
const styles = createStyles({
    avatarImage: {
        height: "100%",
        width: "100%",
        objectFit: "cover",
        textAlign: "center",
    },
});

export default withStyles(styles)(CustomAvatar);
