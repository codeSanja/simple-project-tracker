import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import InProgressCard from "./InProgressCard";
import Popover from "@material-ui/core/Popover/Popover";

const styles = theme => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing.unit,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    }
});

class AddTaskIcon extends Component {
    state = {
        anchorEl: null,
    };

    handlePopoverOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;
        const open = Boolean(anchorEl);
        const popoverAlignment = {
            vertical: 'top',
            horizontal: 'right',
        };

        return [
                <Fab
                    key="1"
                    aria-label="Add"
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    className="add-task-icon"
                    color="default"
                    size="small"
                    onMouseEnter={this.handlePopoverOpen}
                    onMouseLeave={this.handlePopoverClose}
                >
                    <AddIcon />
                </Fab>,
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={popoverAlignment}
                    key="2"
                    transformOrigin={popoverAlignment}
                    onClose={this.handlePopoverClose}
                    disableRestoreFocus
                >
                    <InProgressCard />
                </Popover>
        ]
    };
}

export default withStyles(styles)(AddTaskIcon);

