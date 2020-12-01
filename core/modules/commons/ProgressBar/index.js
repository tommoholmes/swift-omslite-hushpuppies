import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import useStyles from './style';

const ProgressBar = ({
    title,
    total,
    value,
}) => {
    const BorderLinearProgress = withStyles((theme) => ({
        root: {
            height: 10,
            borderRadius: 5,
        },
        colorPrimary: {
            backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        bar: {
            borderRadius: 5,
            backgroundColor: '#5719A0',
        },
    }))(LinearProgress);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <h3 className={classes.title}>{title}</h3>
                <div className={classes.totalValue}>
                    <h3 className={classes.total}>{total}</h3>
                    <span className={classes.percent}>{`(${ value }%)`}</span>
                </div>
            </div>
            <BorderLinearProgress variant="determinate" value={value} />
        </div>
    );
};

export default ProgressBar;
