/* eslint-disable object-curly-newline */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { PagingState, CustomPaging } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';

const DataTable = (props) => {
    const { columns, rows, getRows, pageSize, totalCount } = props;
    const [currentPage, setCurrentPage] = React.useState();

    React.useEffect(() => {
        // console.log({ pageSize, currentPage });
        if (pageSize && currentPage >= 0) {
            getRows({
                pageSize,
                currentPage: currentPage + 1,
            });
        }
    }, [currentPage]);

    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
            >
                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={setCurrentPage}
                    pageSize={pageSize}
                />
                <CustomPaging
                    totalCount={totalCount}
                />
                <Table />
                <TableHeaderRow />
                <PagingPanel />
            </Grid>
        </Paper>
    );
};

export default DataTable;
