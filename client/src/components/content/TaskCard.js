import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from "react-beautiful-dnd"
import '../../styles/Card.scss';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class TaskCard extends PureComponent {

    render() {
        const { id, title, description, index } = this.props;

        return (
            <Draggable draggableId={id} index={index}>
                {(provided) => (
                    <div //here
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {'Priority'}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    <div className="title">{title}</div>
                                </Typography>
                                <Typography color="textSecondary">
                                    adjective
                                </Typography>
                                <Typography component="p">
                                    <div className="description">{description}</div>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </div>
                )}
            </Draggable>
        );


    }
}

TaskCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    index: PropTypes.number.isRequired
};

export default TaskCard;
// export default withStyles(styles)(TaskCard);