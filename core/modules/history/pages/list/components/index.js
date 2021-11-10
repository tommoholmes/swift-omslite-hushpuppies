/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/history/pages/list/components/Header';
import useStyles from '@modules/history/pages/list/components/style';
import TextField from '@common_textfield';

const UpdateStockHistoryListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getHistoryUpdateStockList } = props;
    const historyUpdateStockList = (data && data.getHistoryUpdateStockList && data.getHistoryUpdateStockList.items) || [];
    const historyUpdateStockTotal = (data && data.getHistoryUpdateStockList && data.getHistoryUpdateStockList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID' },
        { field: 'type', headerName: 'Type' },
        { field: 'message', headerName: 'Message', hideable: true, sortable: true },
        { field: 'status', headerName: 'Status', hideable: true, sortable: true },
        { field: 'created_at', headerName: 'Created At', hideable: true, sortable: true },
        { field: 'last_trigered_by', headerName: 'Last Trigered By', hideable: true, sortable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: 'ID From' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: 'ID To' },
        { field: 'type', name: 'type', type: 'like', label: 'Type' },
        { field: 'message', name: 'message', type: 'like', label: 'Message' },
        { field: 'status', name: 'status', type: 'like', label: 'Status' },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: 'Created At From',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        setFilterValue(newValue.target.value);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: 'Created At To',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        setFilterValue(newValue.target.value);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'last_trigered_by', name: 'last_trigered_by', type: 'like', label: 'Last Trigered By' },
    ];

    const rows = historyUpdateStockList.map((history) => ({
        ...history,
        id: history.entity_id,
    }));

    return (
        <>
            <Header />
            <Table
                hideActions
                rows={rows}
                filters={filters}
                getRows={getHistoryUpdateStockList}
                loading={loading}
                columns={columns}
                count={historyUpdateStockTotal}
            />
        </>
    );
};

export default UpdateStockHistoryListContent;
