import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from "react-beautiful-dnd"
import '../../styles/Card.scss';
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
                                <CardActions className="actions">
                                    <Typography className="priority" component="span" color="textSecondary" gutterBottom>
                                        {'Priority: medium'}
                                    </Typography>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                                <Typography variant="h6" className="title">{title}</Typography>
                                <Typography component="div" className="description">{description}</Typography>
                            </CardContent>
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