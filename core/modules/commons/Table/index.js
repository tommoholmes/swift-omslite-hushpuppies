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
    } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // methods
    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        console.log(event.target.value);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        console.log({ page });
    }, [page]);

    const renderTableHeader = () => {
        return (
            <TableHead>
                <TableRow>
                    {columns.map((column, columnIndex) => (
                        <TableCell
                            key={columnIndex}
                            align={columnIndex ? 'right' : 'left'}
                        >
                            {column.headerName}
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
                                align={columnIndex ? 'right' : 'left'}
                            >
                                {row[column.field]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        );
    };

    const renderTableFooter = () => {
        return (
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        colSpan={3}
                        count={24}
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
