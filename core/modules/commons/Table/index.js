/* eslint-disable arrow-body-style */
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTable = (props) => {
    const {
        columns,
        rows,
    } = props;

    React.useEffect(() => {
    }, []);

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

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderTableHeader()}
                {renderTableBody()}
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
