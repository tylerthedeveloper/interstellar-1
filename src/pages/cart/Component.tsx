import {
    Button,
    createStyles,
    Step,
    StepContent,
    StepLabel,
    Stepper, Typography, WithStyles, withStyles,
} from "@material-ui/core";
import * as React from "react";
import { ICartItem } from "Types/local/CartItemType";
import ItemReview from "./item_review/Container";

/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {
    items: ICartItem[];
}

/****  COMPONENT ******/

class Component extends React.PureComponent<IComponentProps> {

    public state: {
        activeStep: number;
    };

    constructor(props: IComponentProps) {
        super(props);
        this.state = {
            activeStep: 0,
        };
    }

    public handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
        });
    }

    public handleMove = (index: number) => {
        this.setState({
            activeStep: index,
        });
    }

    public handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    }

    public handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    }

    public render() {
        const { classes, items } = this.props;
        const { activeStep } = this.state;

        const steps = [
            {
                label: "Review Your Items",
                content: <ItemReview items={items} />,
            },
            {
                label: "Enter Shipping Information",
            },
            {
                label: "Wait for Transaction Confirmation",
            },
        ];

        return (
            <div className={classes.container}>
                <Typography variant={"display2"}> Cart </Typography>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map(({ label, content }, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel>
                                    <Button
                                        onClick={() => this.handleMove(index)}
                                        disabled={
                                            this.state.activeStep + 1 < index
                                        }
                                    >
                                        {label}
                                    </Button>
                                </StepLabel>
                                <StepContent>
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <div>{content ? content : ""}</div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1
                                                    ? "Finish"
                                                    : "Next"}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    container: {
        width: "80%",
        margin: "auto",
    },
    button: {
        marginTop: 10,
        marginRight: 10,
    },
    actionsContainer: {
        marginBottom: 20,
    },
    resetContainer: {
        padding: 30,
    },
});

/****  EXPORT ******/
export default withStyles(styles)(Component);
