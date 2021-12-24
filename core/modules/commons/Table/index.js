/* eslint-disable no-nested-ternary */
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
import ImportExportIcon from '@material-ui/icons/ImportExport';
import TablePaginationActions from '@common_table/components/TablePaginationActions';
import TableFilters from '@common_table/components/TableFilters';
import useStyles from '@common_table/style';
import FilterListIcon from '@material-ui/icons/FilterList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PublishIcon from '@material-ui/icons/Publish';

// helpers
const getComponentOrString = (param) => (typeof param === 'function' ? param() : param);

// custom hooks
const useColumns = (initialColumns) => {
    const _initialColumns = initialColumns.map((column) => ({
        ...column,
        hidden: column.hidden ? column.hidden : false,
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
        setColumns(
            columns.map((column, i) => ({
                ...column,
                hidden: hiddenColumns[i].hidden,
            })),
        );
    };

    const resetHiddenColumn = () => {
        const resetedHiddenColumns = columns.map((column) => ({ ...column, hidden: false }));
        setHiddenColumns(resetedHiddenColumns);
        setColumns(resetedHiddenColumns);
    };

    return {
        columns,
        hiddenColumns,
        setHiddenColumn,
        applyHiddenColumns,
        resetHiddenColumn,
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
        deleteLabel = 'Delete',
        deleteTitle = 'Confirmation',
        deleteMessage = 'Are you sure want to delete selected items?',
        deleteEnableConfirm = false,
        allowActionZeroSelected = false,
        loading,
        filters: initialFilters = [],
        initialPage = 0,
        initialRowsPerPage = 10,
        count,
        actions,
        hideActions = false,
        hideFilters = false,
        hideColumns = false,
        hideFooter = false,
        handleClickRow = null,
        handleReset,
        handleExport,
        varExport,
        setVarExport,
        exportWithId,
        indexType = 0,
        exports = [],
    } = props;

    // hooks
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [isCheckedAllRows, setIsCheckedAllRows] = React.useState(false);
    const [showMessageActions, setShowMessageActions] = React.useState(true);
    const [checkedRows, setCheckedRows] = React.useState([]);
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const { columns, hiddenColumns, setHiddenColumn, applyHiddenColumns, resetHiddenColumn } = useColumns(props.columns);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [sorts, setSorts] = React.useState(
        props.columns.filter((column) => column.sortable).map(({ field, initialSort }) => ({ field, value: initialSort || undefined })),
    );
    const [activeAction, setActiveAction] = React.useState();

    // methods
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const fetchRows = () => {
        const isEmpty = (value) => {
            if ([undefined, null, '', false].includes(value)) return true;
            if (value && value.length <= 0) return true;
            return false;
        };
        const variables = {
            pageSize: rowsPerPage,
            currentPage: page + 1,
            filter: filters
                .filter((e) => !isEmpty(e.value))
                .reduce((accumulator, currentValue) => {
                    accumulator[currentValue.field] = {
                        ...accumulator[currentValue.field],
                        [typeof currentValue.type === 'object'
                            ? currentValue.type[indexType[currentValue.name]]
                            : currentValue.type]: currentValue.value,
                    };
                    return accumulator;
                }, {}),
            sort: sorts.reduce((accumulator, currentValue) => {
                accumulator[currentValue.field] = currentValue.value || undefined;
                return accumulator;
            }, {}),
        };
        const variablesExport = {
            filter: filters
                .filter((e) => !isEmpty(e.value))
                .reduce((accumulator, currentValue) => {
                    accumulator[currentValue.field] = {
                        ...accumulator[currentValue.field],
                        [currentValue.type]: currentValue.value,
                    };
                    return accumulator;
                }, {}),
            sort: sorts.reduce((accumulator, currentValue) => {
                accumulator[currentValue.field] = currentValue.value || undefined;
                return accumulator;
            }, {}),
        };
        if (setVarExport) {
            setVarExport(variablesExport);
        }
        getRows({ variables });
        setCheckedRows([]);
    };

    // effects
    React.useEffect(() => {
        fetchRows();
    }, [page, rowsPerPage, filters, sorts]);

    const cancelDeleteRowNotif = () => {
        setOpenConfirmDialog(false);
        window.toastMessage({
            open: true,
            text: 'Canceled!',
            variant: 'error',
        });
    };

    React.useEffect(() => {
        if (exportWithId === true) {
            const variables = checkedRows && checkedRows.map((checkedRow) => checkedRow.id);
            const prevState = varExport;
            prevState.id = variables;
            setVarExport(prevState);
        }
    }, [checkedRows]);

    const renderTableToolbar = () => {
        const toolbarActions = actions || [
            {
                title: deleteTitle,
                label: deleteLabel,
                message: deleteMessage,
                confirmDialog: deleteEnableConfirm,
                onClick: async (_checkedRows) => {
                    const variables = { [primaryKey]: _checkedRows.map((checkedRow) => checkedRow[primaryKey]) };
                    await deleteRows({ variables });
                    window.toastMessage({
                        open: true,
                        text: 'Delete success!',
                        variant: 'success',
                    });
                },
            },
        ];
        return (
            <div className={classes.tableToolbar}>
                <div className="top-buttons-wrapper">
                    {!loading && (
                        <div className="top-item records-found">
                            {`${count} records found `}
                            {checkedRows.length ? ` (${checkedRows.length} selected)` : null}
                        </div>
                    )}
                    {!hideActions && (
                        <div className="top-item">
                            <ConfirmDialog
                                open={openConfirmDialog}
                                onCancel={() => cancelDeleteRowNotif()}
                                onConfirm={async () => {
                                    window.backdropLoader(true);
                                    if ((checkedRows && checkedRows.length) || allowActionZeroSelected) {
                                        setOpenConfirmDialog(false);
                                        await activeAction.onClick(checkedRows);
                                        fetchRows();
                                        if (showMessageActions) {
                                            window.toastMessage({
                                                open: true,
                                                text: 'Success!',
                                                variant: 'success',
                                            });
                                        }
                                    }
                                    setCheckedRows([]);
                                    setOpenConfirmDialog(false);
                                    window.backdropLoader(false);
                                }}
                                title={activeAction && activeAction.title}
                                message={activeAction && activeAction.message}
                                records={checkedRows.length}
                            />
                            <button
                                id="clickConfirm"
                                className="hide"
                                type="submit"
                                onClick={async () => {
                                    if (checkedRows && checkedRows.length) {
                                        await activeAction.onClick(checkedRows);
                                        fetchRows();
                                        if (showMessageActions) {
                                            window.toastMessage({
                                                open: true,
                                                text: 'Success!',
                                                variant: 'success',
                                            });
                                        }
                                        // window.location.reload();
                                    }
                                }}
                            >
                                Auto Confirm
                            </button>
                            <MenuPopover
                                openButton={{ label: 'Actions' }}
                                icon={<ExpandMoreIcon />}
                                menuItems={toolbarActions.map((action) => ({
                                    label: action.label,
                                    onClick: () => {
                                        const tempAction = { ...action };

                                        if (allowActionZeroSelected && checkedRows?.length === 0) {
                                            tempAction.confirmDialog = true;
                                        }
                                        setActiveAction(tempAction);
                                        if (tempAction.showMessage !== null) {
                                            setShowMessageActions(tempAction.showMessage);
                                        } else {
                                            setShowMessageActions(false);
                                        }
                                        if (tempAction.confirmDialog) {
                                            setOpenConfirmDialog(true);
                                        } else {
                                            setTimeout(() => {
                                                document.getElementById('clickConfirm').click();
                                            }, 100);
                                        }
                                    },
                                }))}
                            />
                        </div>
                    )}
                    {!hideColumns && (
                        <div className="top-item">
                            <Button
                                className={classes.btn}
                                onClick={() => setExpandedToolbar(expandedToolbar != 'toggleColums' ? 'toggleColums' : '')}
                            >
                                columns
                            </Button>
                        </div>
                    )}

                    {!hideFilters && (
                        <div className="top-item">
                            <Button
                                className={clsx(classes.btn, 'filter')}
                                onClick={() => setExpandedToolbar(expandedToolbar != 'filters' ? 'filters' : '')}
                                variant="contained"
                                buttonType="primary-rounded"
                            >
                                <FilterListIcon style={{ marginRight: 10 }} />
                                filters
                            </Button>
                        </div>
                    )}

                    {handleExport && (
                        <div className="top-item">
                            <Button className={clsx(classes.btn, 'filter')} onClick={handleExport} variant="contained" buttonType="primary-rounded">
                                <PublishIcon style={{ marginRight: 10 }} />
                                export
                            </Button>
                        </div>
                    )}
                    {exports.length ? (
                        <>
                            <button
                                id="clickConfirmExport"
                                className="hide"
                                type="submit"
                                onClick={() => {
                                    activeAction.onClick(checkedRows);
                                }}
                            >
                                Auto Confirm
                            </button>
                            <div className="top-item">
                                <MenuPopover
                                    openButton={{ label: 'Exports' }}
                                    color="purple"
                                    iconPosition="end"
                                    icon={<PublishIcon />}
                                    menuItems={exports.map((action) => ({
                                        label: action.label,
                                        onClick: () => {
                                            setActiveAction(action);
                                            setTimeout(() => {
                                                document.getElementById('clickConfirmExport').click();
                                            }, 100);
                                        },
                                    }))}
                                />
                            </div>
                        </>
                    ) : null}
                </div>
                <div style={{ background: '#EBEFF6' }}>
                    <Collapse in={expandedToolbar === 'toggleColums'}>
                        <div style={{ padding: 12 }}>
                            {hiddenColumns.find((c) => c.hideable) && (
                                <div style={{ padding: 12 }}>{`${columns.filter((c) => !c.hidden).length} out of ${columns.length} visible`}</div>
                            )}
                            {!hiddenColumns.find((c) => c.hideable) && <div style={{ padding: 12 }}>Toggle show fields is empty.</div>}
                            {hiddenColumns
                                .filter((c) => c.hideable)
                                .map((column, index) => (
                                    <div key={index} style={{ maxHeight: 'inherit', paddingRight: 24 }} className="boxColumn">
                                        <Checkbox checked={!column.hidden} onChange={(e) => setHiddenColumn(column.field, !e.target.checked)} />
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
                        <TableFilters initialFilters={filters} setParentFilters={setFilters} handleReset={handleReset} />
                    </Collapse>
                </div>
            </div>
        );
    };

    const renderTableHeader = () => {
        const getIdsForExport = (newCheckedRows) => {
            const variables = newCheckedRows.map((checkedRow) => checkedRow.id);
            const prevState = varExport;
            prevState.id = variables;
            setVarExport(prevState);
        };

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
            if (exportWithId === true) {
                getIdsForExport(newCheckedRows);
            }
            setCheckedRows(newCheckedRows);
            setIsCheckedAllRows(checked);
        };

        const setSortByField = (field) => {
            setSorts(
                sorts.map((sort) => ({
                    ...sort,
                    ...(sort.field === field && { value: sort.value === 'ASC' ? 'DESC' : 'ASC' }),
                    ...(sort.field != field && { value: undefined }),
                })),
            );
        };
        const getSortValue = (field) => {
            const sort = sorts.find((e) => e.field === field);
            return sort && sort.value;
        };
        const getArrowClass = (field) => (getSortValue(field) === 'ASC' ? classes.arrowDown : classes.arrowUp);
        return (
            <TableHead>
                <TableRow>
                    {showCheckbox && (
                        <TableCell>
                            <Checkbox checked={isCheckedAllRows} onChange={(e) => handleChangeCheckboxAllRows(e.target.checked)} />
                        </TableCell>
                    )}
                    {columns.map((column, columnIndex) => (
                        <TableCell key={columnIndex} className={clsx(column.hidden && 'hide')} style={{ whiteSpace: 'nowrap' }}>
                            {!column.sortable && getComponentOrString(column.headerName)}
                            {column.sortable && (
                                <Button
                                    onClick={() => setSortByField(column.field)}
                                    style={{ marginLeft: -16 }}
                                    buttonType="link"
                                    endIcon={
                                        getSortValue(column.field) ? (
                                            <ArrowRightAltIcon className={getArrowClass(column.field)} />
                                        ) : (
                                            <ImportExportIcon style={{ opacity: 0.3 }} />
                                        )
                                    }
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
                    <TableRow
                        key={rowIndex}
                        onClick={() => (handleClickRow ? handleClickRow(row) : null)}
                        style={{
                            cursor: handleClickRow ? 'pointer' : 'default',
                        }}
                    >
                        {showCheckbox && (
                            <TableCell>
                                <Checkbox
                                    checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                    onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                />
                            </TableCell>
                        )}
                        {columns.map((column, columnIndex) => (
                            <TableCell key={columnIndex} className={clsx(column.hidden && 'hide')}>
                                {getComponentOrString(row[column.field]) || '-'}
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
        <TableContainer component={Paper} className={classes.tableContainer}>
            {renderTableToolbar()}
            <div className={classes.mainTable}>
                {loading ? (
                    <div className={classes.loading}>Loading . . .</div>
                ) : rows.length ? (
                    <Table size="small">
                        {renderTableHeader()}
                        {renderTableBody()}
                    </Table>
                ) : (
                    <div className={classes.loading}>No records to display</div>
                )}
            </div>
            {!hideFooter && renderTableFooter()}
        </TableContainer>
    );
};

export default CustomTable;
