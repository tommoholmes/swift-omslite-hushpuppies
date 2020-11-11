/* eslint-disable object-curly-newline */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

const DataTable = (props) => {
    const { columns, rows } = props;

    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
            >
                <Table />
                <TableHeaderRow />
            </Grid>
        </Paper>
    );
};

export default DataTable;
