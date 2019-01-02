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

const styles = {
    // card: {
    //     minWidth: 275,
    // },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    // title: {
    //     fontSize: 14,
    // },
    // pos: {
    //     marginBottom: 12,
    // },
};

// class Card extends PureComponent {
class TaskCard extends PureComponent {

    render() {
        const { classes, id, title, description, index } = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        // return (
        //     <Draggable draggableId={id} index={index}>
        //         {(provided) => (
        //             <div //here
        //                 className="card"
        //                 ref={provided.innerRef}
        //                 {...provided.draggableProps}
        //                 {...provided.dragHandleProps}
        //             >
        //                 <div className="title">{title}</div>
        //                 <div className="description">{description}</div>
        //             </div>
        //         )}
        //     </Draggable>
        // );

        return (
            <Draggable draggableId={id} index={index}>
                {(provided) => (
                    <div //here
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {/*<div className="title">{title}</div>*/}
                        {/*<div className="description">{description}</div>*/}
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    be
                                    {bull}
                                    nev
                                    {bull}o{bull}
                                    lent
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    adjective
                                </Typography>
                                <Typography component="p">
                                    well meaning and kindly.
                                    <br />
                                    {'"a benevolent smile"'}
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

Card.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    index: PropTypes.number.isRequired
};

// export default Card;
export default withStyles(styles)(TaskCard);