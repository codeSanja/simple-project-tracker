export const changeCardsOrder = (cards, start, source, destination, draggableId) => {
    const newTaskIds = Array.from(start.taskIds)
    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, draggableId)

    const newColumn = {
        ...start,
        taskIds: newTaskIds
    }

    return {
        ...cards,
        columns: {
            ...cards.columns,
            [newColumn.id]: newColumn,
        },
    }
}

export const moveCard = (cards, start, finish, source, destination, draggableId) => {
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
        ...start,
        taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
        ...finish,
        taskIds: finishTaskIds
    };

    return {
        ...cards,
        columns: {
            ...cards.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
        },
    }
}