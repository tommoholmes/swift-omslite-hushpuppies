/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import { optionsStatus } from '@modules/notification/helpers';
import useStyles from './style';
import Header from './Header';

const NotificationListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getNotificationList, multiReadNotification } = props;
    const notificationList = (data && data.getNotificationList && data.getNotificationList.items) || [];
    const notificationTotal = (data && data.getNotificationList && data.getNotificationList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true, initialSort: 'ASC' },
        { field: 'created_at', headerName: 'Created At', sortable: true },
        { field: 'entity_type', headerName: 'Type', sortable: true },
        { field: 'status', headerName: 'Status', sortable: true },
        { field: 'message', headerName: 'Messages', sortable: true },
        { field: 'attachment', headerName: 'Attachment' },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: 'ID To', initialValue: '' },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: 'Created at From',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => { setFilterValue(newValue.target.value); }}
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
            label: 'Created at To',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => { setFilterValue(newValue.target.value); }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'entity_type', name: 'entity_type', type: 'like', label: 'Type', initialValue: '' },
        { field: 'message', name: 'message', type: 'like', label: 'Messages', initialValue: '' },
        {
            field: 'status',
            name: 'status',
            type: 'in',
            label: 'Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    style={{ width: 228 }}
                    multiple
                    value={(filterValue || []).map((option) => optionsStatus.find((e) => e.name === option))}
                    onChange={(newValue) => setFilterValue((newValue || []).map((option) => option && option.name))}
                    options={optionsStatus}
                />
            ),
        },
    ];

    const actions = [
        {
            label: 'Mark as Read',
            message: 'Are you sure you want to continue?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await multiReadNotification({ variables });
            },
        },
    ];

    const rows = notificationList.map((notification) => ({
        ...notification,
        id: notification.id,
    }));

    // if (!data || loading) {
    //     return (
    //         <div>Loading . . .</div>
    //     );
    // }

    return (
        <>
            <Header />
            <Table
                filters={filters}
                actions={actions}
                rows={rows}
                getRows={getNotificationList}
                loading={loading}
                columns={columns}
                count={notificationTotal}
                showCheckbox
            />
        </>
    );
};

export default NotificationListContent;
