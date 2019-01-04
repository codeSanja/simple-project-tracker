import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from "react-beautiful-dnd"
import '../../bemStyles/Card.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';

class TaskCard extends PureComponent {

    render() {
        const { id, title, description, index } = this.props;

        return (
            <Draggable draggableId={id} index={index}>
                {(provided) => (
                    <div
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Card>
                            <CardContent className="card-content">
                                <Typography variant="div" className="title">{title}</Typography>
                                <CardActions className="actions">
                                    <IconButton className="edit-task-icon-area" aria-label="Edit">
                                        <Icon>edit_icon</Icon>
                                    </IconButton>
                                    <IconButton className="edit-task-icon-area" aria-label="Delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
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