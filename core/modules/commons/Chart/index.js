import * as React from 'react';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    BarSeries,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import useStyles from './style';

const CustomCart = ({
    data = [],
    className = {},
    chartType = 'line',
}) => {
    const classes = useStyles();
    const getClassByType = (type) => {
        if (type === 'bar') {
            return classes.bar;
        }
        return classes.line;
    };
    const customClass = classNames(
        getClassByType(chartType),
        className,
    );
    return (
        <Paper className={customClass}>
            <Chart
                data={data}
                className={classes.chart}
            >
                {/* <ArgumentAxis />
                <ValueAxis />

                <LineSeries valueField="value" argumentField="argument" color="#5719A0" /> */}

                <ArgumentScale factory={scaleBand} />
                <ArgumentAxis />
                <ValueAxis />
                <BarSeries
                    valueField="value"
                    argumentField="month"
                    name="Total Order"
                    color="#efefef"
                />
                <BarSeries
                    valueField="value1"
                    argumentField="month"
                    name="Total Shipment"
                    color="#c9dde6"
                />
                <Legend />
                <Stack />
            </Chart>
        </Paper>
    );
};

export default CustomCart;
