import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    italic: {
        fontStyle: 'italic'
    }
});

class AddTaskIcon extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Material UI
                    </Typography>
                    <Typography className={classes.italic} variant="h5" component="h2">
                        Add a new task
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        feature is in progress.
                    </Typography>
                </CardContent>
            </Card>
        )
    };
}

AddTaskIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTaskIcon);
