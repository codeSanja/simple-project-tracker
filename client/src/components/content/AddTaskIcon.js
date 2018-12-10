import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function AddTaskIcon(props) {
    return (
        <Fab className="add-task-icon" color="action" size="small" aria-label="Add">
            <AddIcon />
        </Fab>
    );
}

export default AddTaskIcon;
