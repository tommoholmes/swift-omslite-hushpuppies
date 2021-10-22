/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
import useStyles from '@common_customlist/style';
import Button from '@common_button';
import ListFilters from '@common_customlist/components/ListFilters';
import ConfirmDialog from 'core/modules/commons/ConfirmDialog';
import MenuPopover from '@common_menupopover';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';
import FilterListIcon from '@material-ui/icons/FilterList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';

// helpers
const getComponentOrString = (param) => (
    typeof param === 'function' ? param() : param
);

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

const CustomList = (props) => {
    const {
        showCheckbox = false,
        primaryKey = 'id',
        rows,
        getRows,
        loading,
        filters: initialFilters = [],
        actions,
        hideActions = true,
        hideColumn = true,
        handleReset,
        initialPage = 0,
        initialRowsPerPage = 15,
        header = null,
        handleClickRow,
        handleChecked = () => {},
        count,
        usePagination = false,
    } = props;
    // hooks
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [checkedRows, setCheckedRows] = React.useState([]);
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const {
        columns, hiddenColumns, setHiddenColumn, applyHiddenColumns, resetHiddenColumn,
    } = useColumns(props.columns);
    const [filters, setFilters] = React.useState(
        initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })),
    );
    const [sorts] = React.useState(
        props.columns
            .filter((column) => column.sortable)
            .map(({ field, initialSort }, i) => ({ field, value: i === 0 ? initialSort : undefined })),
    );
    const [activeAction, setActiveAction] = React.useState();

    const fetchRows = () => {
        const isEmpty = (value) => {
            if ([undefined, null, '', false].includes(value)) return true;
            if (value && value.length <= 0) return true;
            return false;
        };
        const variables = {
            pageSize: rowsPerPage,
            currentPage: page + 1,
            filter: filters.filter((e) => !isEmpty(e.value)).reduce((accumulator, currentValue) => {
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
        getRows({ variables });
    };

    const handleChangeCheckboxRow = (checked, row) => {
        const i = checkedRows.findIndex((checkedRow) => checkedRow[primaryKey] === row[primaryKey]);
        if (checked && i < 0) {
            setCheckedRows([...checkedRows, row]);
            handleChecked([...checkedRows, row]);
        } else if (!checked && i >= 0) {
            // eslint-disable-next-line eqeqeq
            setCheckedRows(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
            handleChecked(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
        }
    };

    const renderTableToolbar = () => (
        <div className={classes.tableToolbar}>
            <div className={header ? 'top-header' : 'top'}>
                {header && header()}
                <div className="top-buttons-wrapper">
                    {!hideActions && actions.length && (
                        <div className="top-item">
                            <ConfirmDialog
                                open={openConfirmDialog}
                                onConfirm={async () => {
                                    if (checkedRows && checkedRows.length) {
                                        await activeAction.onClick(checkedRows);
                                        fetchRows();
                                    }
                                    setOpenConfirmDialog(false);
                                }}
                                message={activeAction && activeAction.message}
                            />
                            <button
                                id="clickConfirm"
                                className="hide"
                                type="submit"
                                onClick={async () => {
                                    if (checkedRows && checkedRows.length) {
                                        await activeAction.onClick(checkedRows);
                                        fetchRows();
                                        window.toastMessage({
                                            open: true,
                                            text: 'Success!',
                                            variant: 'success',
                                        });
                                    // window.location.reload();
                                    }
                                }}
                            >
                                Auto Confirm
                            </button>
                            <MenuPopover
                                openButton={{ label: 'Actions' }}
                                icon={<ExpandMoreIcon />}
                                menuItems={actions.map((action) => ({
                                    label: action.label,
                                    onClick: () => {
                                        setActiveAction(action);
                                        if (action.label === 'Delete') {
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
                    {!hideColumn
                && (
                    <div className="top-item">
                        <Button
                            className={classes.btn}
                            onClick={() => setExpandedToolbar(expandedToolbar != 'toggleColums' ? 'toggleColums' : '')}
                        >
                            columns
                        </Button>
                    </div>
                )}
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
                </div>
            </div>
            <div style={{ background: '#EBEFF6' }}>
                <Collapse in={expandedToolbar === 'toggleColums'}>
                    <div style={{ padding: 12 }}>
                        {(hiddenColumns.find((c) => c.hideable)) && (
                            <div style={{ padding: 12 }}>
                                {`${columns.filter((c) => !c.hidden).length} out of ${columns.length} visible`}
                            </div>
                        )}
                        {!(hiddenColumns.find((c) => c.hideable)) && (
                            <div style={{ padding: 12 }}>Toggle show fields is empty.</div>
                        )}
                        {hiddenColumns.filter((c) => c.hideable).map((column, index) => (
                            <div key={index} style={{ maxHeight: 'inherit', paddingRight: 24 }} className="boxColumn">
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
                    <ListFilters initialFilters={initialFilters} parentFilters={filters} setParentFilters={setFilters} handleReset={handleReset} />
                </Collapse>
            </div>
        </div>
    );

    React.useEffect(() => {
        fetchRows();
    }, [filters, sorts]);

    return (
        <div>
            {renderTableToolbar()}
            {loading ? <div className={classes.loading}>Loading . . .</div>
                : rows.length ? rows.map((row, i) => (
                    <div
                        key={i}
                        className={clsx(classes.gridList, classes.content)}
                        style={{ gridTemplateColumns: showCheckbox ? `1fr repeat(${columns.length}, 2fr)` : `repeat(${columns.length}, 1fr)` }}
                    >
                        {showCheckbox && (
                            <Checkbox
                                checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                            />
                        )}
                        {columns.map((column, columnIndex) => {
                            return (
                                !column.hidden && (
                                    <div
                                        key={columnIndex}
                                        style={{ paddingLeft: 10,
                                            cursor: handleClickRow ? 'pointer' : 'unset',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            overflowWrap: 'break-word',
                                        }}
                                        onClick={() => handleClickRow ? handleClickRow(row.id) : null}
                                    >
                                        <h5
                                            className={classes.titleList}
                                        >
                                            {column.headerName}
                                        </h5>
                                        <h5
                                            className={classes.bodyList}
                                        >
                                            {getComponentOrString(row[column.field])}
                                        </h5>
                                    </div>
                                )
                            );
                        })}
                    </div>
                ))
                    : <div className={classes.loading}>No records to display</div>}
            {usePagination && count > rowsPerPage
                ? <Pagination count={count / rowsPerPage} page={page} onChange={() => { setPage(page + 1); }} />
                : null}
        </div>
    );
};

export default CustomList;
