/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TablePaginationActions from './components/TablePaginationActions';

const CustomTable = (props) => {
    const {
        columns,
        rows,
        getRows,
        loading,
        initialPage = 0,
        initialRowsPerPage = 10,
        count,
    } = props;
    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);

    // methods
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        const variables = {
            pageSize: rowsPerPage,
            currentPage: page + 1,
        };
        getRows({ variables });
    }, [page, rowsPerPage]);

    const getComponentOrString = (param) => (
        typeof param === 'function' ? param() : param
    );

    const renderTableHeader = () => {
        return (
            <TableHead>
                <TableRow>
                    {columns.map((column, columnIndex) => (
                        <TableCell
                            key={columnIndex}
                        >
                            {getComponentOrString(column.headerName)}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    const renderTableBody = () => {
        return (
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {columns.map((column, columnIndex) => (
                            <TableCell
                                key={columnIndex}
                            >
                                {getComponentOrString(row[column.field])}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
                {/* {loading && <div>Loading...</div>} */}
            </TableBody>
        );
    };

    const renderTableFooter = () => {
        return (
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        colSpan={3}
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>
        );
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderTableHeader()}
                {renderTableBody()}
                {renderTableFooter()}
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
