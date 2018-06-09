// @flow
import React from "react";
import {
    Stepper,
    Button,
    StepContent,
    Typography,
    Step,
    StepLabel
} from "@material-ui/core";
import type { ComponentType } from "react";
import injectSheet from "react-jss";

/****  TYPES ******/
type ClassProp = {
    classes: { [$Keys<typeof styles>]: string }
};

type ComponentProps = {};

/****  COMPONENT ******/

const steps = [
    {
        label: "Review Your Items"
    },
    {
        label: "Enter Shipping Information"
    },
    {
        label: "Wait for Transaction Confirmation"
    }
];

class Component extends React.PureComponent<ComponentProps & ClassProp, any> {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        };
    }

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        });
    };

    handleMove = (index) => {
        this.setState({
            activeStep: index
        });
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0
        });
    };

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;

        return (
            <div className={classes.container}>
                <Typography variant={"display2"}> Cart </Typography>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map(({ label }, index) => {
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
const styles = {
    container: {
        width: "80%",
        margin: "auto"
    },
    button: {
        marginTop: 10,
        marginRight: 10
    },
    actionsContainer: {
        marginBottom: 20
    },
    resetContainer: {
        padding: 30
    }
};

/****  EXPORT ******/
export default (injectSheet(styles)(Component): ComponentType<ComponentProps>);
