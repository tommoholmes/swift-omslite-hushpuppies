/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
import React from 'react';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import MenuPopover from '@common_menupopover';
import ConfirmDialog from 'core/modules/commons/ConfirmDialog';
import Button from '@common_button';
import Collapse from '@material-ui/core/Collapse';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import TablePaginationActions from './components/TablePaginationActions';
import TableFilters from './components/TableFilters';
import useStyles from './style';

// helpers
const getComponentOrString = (param) => (
    typeof param === 'function' ? param() : param
);

// custom hooks
const useColumns = (initialColumns) => {
    const _initialColumns = initialColumns.map((column) => ({
        ...column,
        hidden: false,
    }));
    const [columns, setColumns] = React.useState(_initialColumns);
    const [hiddenColumns, setHiddenColumns] = React.useState(_initialColumns);

    const setHiddenColumn = (field, hidden) => {
        setHiddenColumns(
            hiddenColumns.map((column) => ({
                ...column,
                hidden: field == column.field ? hidden : column.hidden,
            })),
        );
    };

    const applyHiddenColumns = () => {
        setColumns(columns.map((column, i) => ({
            ...column,
            hidden: hiddenColumns[i].hidden,
        })));
    };

    const resetHiddenColumn = () => {
        const resetedHiddenColumns = columns.map((column) => ({ ...column, hidden: false }));
        setHiddenColumns(resetedHiddenColumns);
        setColumns(resetedHiddenColumns);
    };

    return {
        columns, hiddenColumns, setHiddenColumn, applyHiddenColumns, resetHiddenColumn,
    };
};

// main component
const CustomTable = (props) => {
    const {
        showCheckbox = false,
        primaryKey = 'id',
        rows,
        getRows,
        deleteRows,
        // loading,
        filters: initialFilters = [],
        initialPage = 0,
        initialRowsPerPage = 10,
        count,
    } = props;

    // hooks
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [isCheckedAllRows, setIsCheckedAllRows] = React.useState(false);
    const [checkedRows, setCheckedRows] = React.useState([]);
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const {
        columns, hiddenColumns, setHiddenColumn, applyHiddenColumns, resetHiddenColumn,
    } = useColumns(props.columns);
    const [filters, setFilters] = React.useState(
        initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })),
    );
    const [sorts, setSorts] = React.useState(
        props.columns
            .filter((column) => column.enableSort)
            .map(({ field, initialSort }) => ({ field, value: initialSort || 'ASC' })),
    );

    // methods
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const fetchRows = () => {
        const variables = {
            pageSize: rowsPerPage,
            currentPage: page + 1,
            filter: filters.filter((e) => e.value).reduce((accumulator, currentValue) => {
                accumulator[currentValue.field] = {
                    ...accumulator[currentValue.field],
                    [currentValue.type]: currentValue.value,
                };
                return accumulator;
            }, {}),
            sort: sorts.reduce((accumulator, currentValue) => {
                accumulator[currentValue.field] = currentValue.value;
                return accumulator;
            }, {}),
        };
        getRows({ variables });
    };

    // effects
    React.useEffect(() => {
        fetchRows();
    }, [page, rowsPerPage, filters, sorts]);

    const renderTableToolbar = () => {
        return (
            <div className={classes.tableToolbar}>
                <div className="top-buttons-wrapper">
                    <div className="top-item records-found">{`${count} records found.`}</div>
                    <div className="top-item">
                        <ConfirmDialog
                            open={openConfirmDialog}
                            onCancel={() => setOpenConfirmDialog(false)}
                            onConfirm={async () => {
                                // need imporvement later (after gql ready for deleteRows)
                                if (checkedRows && checkedRows.length) {
                                    const variables = { [primaryKey]: checkedRows.map((checkedRow) => checkedRow[primaryKey]) };
                                    await deleteRows({ variables });
                                    fetchRows();
                                }
                                setOpenConfirmDialog(false);
                            }}
                            message="Are you sure you want to delete?"
                        />
                        <MenuPopover
                            openButton={{ label: 'Actions' }}
                            menuItems={[
                                { label: 'Delete', onClick: () => setOpenConfirmDialog(true) },
                            ]}
                        />
                    </div>
                    <div className="top-item">
                        <Button
                            className={classes.btn}
                            onClick={() => setExpandedToolbar(expandedToolbar != 'toggleColums' ? 'toggleColums' : '')}
                        >
                            columns
                        </Button>
                    </div>
                    <div className="top-item">
                        <Button
                            className={classes.btn}
                            onClick={() => setExpandedToolbar(expandedToolbar != 'filters' ? 'filters' : '')}
                        >
                            filters
                        </Button>
                    </div>
                </div>
                <div style={{ background: '#EBEFF6' }}>
                    <Collapse in={expandedToolbar === 'toggleColums'}>
                        <div style={{ padding: 12 }}>
                            {!(hiddenColumns.find((c) => c.hideable)) && (
                                <div style={{ padding: 12 }}>Toggle show fields is empty.</div>
                            )}
                            {hiddenColumns.filter((c) => c.hideable).map((column, index) => (
                                <div key={index} style={{ maxHeight: 'inherit', display: 'inline-block', paddingRight: 24 }}>
                                    <Checkbox
                                        checked={!column.hidden}
                                        onChange={(e) => setHiddenColumn(column.field, !e.target.checked)}
                                    />
                                    {column.headerName}
                                </div>
                            ))}
                            <div style={{ padding: 12 }}>
                                <Button buttonType="primary-rounded" onClick={applyHiddenColumns}>
                                    Apply
                                </Button>
                                <Button buttonType="link" onClick={resetHiddenColumn}>
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </Collapse>
                    <Collapse in={expandedToolbar === 'filters'}>
                        <TableFilters initialFilters={filters} setParentFilters={setFilters} />
                    </Collapse>
                </div>
            </div>
        );
    };

    const renderTableHeader = () => {
        const handleChangeCheckboxAllRows = (checked) => {
            const newCheckedRows = rows.reduce((accumulator, currentValue) => {
                const i = accumulator.findIndex((checkedRow) => checkedRow[primaryKey] === currentValue[primaryKey]);
                if (checked && i < 0) {
                    accumulator.push(currentValue);
                } else if (!checked && i >= 0) {
                    return accumulator.filter((checkedRow) => checkedRow[primaryKey] != currentValue[primaryKey]);
                }
                return accumulator;
            }, checkedRows);
            setCheckedRows(newCheckedRows);
            setIsCheckedAllRows(checked);
        };
        const setSortByField = (field) => {
            setSorts(sorts.map((sort) => ({
                ...sort,
                ...((sort.field === field) && { value: sort.value === 'ASC' ? 'DESC' : 'ASC' }),
            })));
        };
        const getArrowClass = (field) => {
            const sort = sorts.find((e) => e.field === field);
            return sort.value === 'ASC' ? classes.arrowDown : classes.arrowUp;
        };
        return (
            <TableHead>
                <TableRow>
                    {showCheckbox && (
                        <TableCell>
                            <Checkbox
                                checked={isCheckedAllRows}
                                onChange={(e) => handleChangeCheckboxAllRows(e.target.checked)}
                            />
                        </TableCell>
                    )}
                    {columns.map((column, columnIndex) => (
                        <TableCell
                            key={columnIndex}
                            className={clsx(column.hidden && 'hide')}
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            {!column.enableSort && getComponentOrString(column.headerName)}
                            {column.enableSort && (
                                <Button
                                    onClick={() => setSortByField(column.field)}
                                    style={{ marginLeft: -16 }}
                                    buttonType="link"
                                    endIcon={<ArrowRightAltIcon className={getArrowClass(column.field)} />}
                                >
                                    {column.headerName}
                                </Button>
                            )}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    const renderTableBody = () => {
        const handleChangeCheckboxRow = (checked, row) => {
            const i = checkedRows.findIndex((checkedRow) => checkedRow[primaryKey] === row[primaryKey]);
            if (checked && i < 0) {
                setCheckedRows([...checkedRows, row]);
            } else if (!checked && i >= 0) {
                setCheckedRows(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
            }
        };
        return (
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {showCheckbox && (
                            <TableCell>
                                <Checkbox
                                    checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                    onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                />
                            </TableCell>
                        )}
                        {columns.map((column, columnIndex) => (
                            <TableCell
                                key={columnIndex}
                                className={clsx(column.hidden && 'hide')}
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
            <>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
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
            </>
        );
    };

    return (
        <TableContainer component={Paper}>
            {renderTableToolbar()}
            <Table size="small">
                {renderTableHeader()}
                {renderTableBody()}
                {renderTableFooter()}
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
