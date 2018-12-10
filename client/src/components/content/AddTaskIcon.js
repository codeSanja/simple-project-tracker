import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import InProgressCard from './InProgressCard';

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
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const popOverAlign = {
            vertical: 'top',
            horizontal: 'center',
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
                    anchorOrigin={popOverAlign}
                    key="2"
                    transformOrigin={popOverAlign}
                    onClose={this.handlePopoverClose}
                    disableRestoreFocus
                >
                    <InProgressCard />
                </Popover>
        ]
    };
}

AddTaskIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTaskIcon);
