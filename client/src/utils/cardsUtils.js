import { isEqual } from "lodash"

const changeCardsOrder = (cards, result) => {
    const { destination, source, draggableId } = result;

    const start = cards.columns[source.droppableId];

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

const moveCardToDifferentColumn = (cards, result) => {
    const { destination, source, draggableId } = result;

    const start = cards.columns[source.droppableId];
    const finish = cards.columns[destination.droppableId];

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

export const moveCard = (cards, result) => {
    const { destination, source } = result;
    const start = cards.columns[source.droppableId];
    const finish = cards.columns[destination.droppableId];

    return isEqual(start, finish) ? changeCardsOrder(cards, result)
                                  : moveCardToDifferentColumn(cards, result)

}