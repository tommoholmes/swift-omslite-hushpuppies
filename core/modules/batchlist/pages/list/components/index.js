/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import CustomList from '@common_customlist';
import Link from 'next/link';
import Router from 'next/router';
import Autocomplete from '@common_autocomplete';
// import { optionsStatus } from '@modules/batchlist/helpers';
import statusGqlService from '@modules/batchlist/services/graphql';
import Header from '@modules/batchlist/pages/list/components/Header';
import useStyles from '@modules/batchlist/pages/list/components/style';

const PickByBatchListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getPickByBatchList } = props;
    const PickByBatchList = (data && data.getPickByBatchList && data.getPickByBatchList.items) || [];
    const PickByBatchTotal = (data && data.getPickByBatchList && data.getPickByBatchList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'Batch Number', sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'created_at', headerName: 'Date', hideable: true },
        { field: 'status', headerName: 'Status', sortable: true, hideable: true },
    ];

    const filters = [
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: 'Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getPickByBatchStatus, getPickByBatchStatusRes] = statusGqlService.getPickByBatchStatus();
                const statusOptions = (getPickByBatchStatusRes
                    && getPickByBatchStatusRes.data
                    && getPickByBatchStatusRes.data.getPickByBatchStatus) || [];
                const primaryKey = 'value';
                const labelKey = 'label';
                return (
                    <Autocomplete
                        mode="lazy"
                        style={{ width: 228 }}
                        getOptions={getPickByBatchStatus}
                        value={statusOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={statusOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'status',
            name: 'status',
            type: 'neq',
            label: 'Status',
            initialValue: 'sort_complete',
            hidden: true,
        },

    ];

    const getClassByStatus = (status) => {
        if (status.value === 'new') {
            return classes.green;
        }
        if (status.value === 'pick_in_progress' || status.value === 'sorting_in_progress') {
            return classes.orange;
        }
        if (status.value === 'pick_uncomplete') {
            return classes.red;
        }
        return classes.gray;
    };

    const rows = PickByBatchList.map((batchlist) => ({
        ...batchlist,
        id: batchlist.entity_id,
        status: () => (
            <span className={getClassByStatus(batchlist.status)}>
                {batchlist.status.label}
            </span>
        ),
    }));

    return (
        <>
            {/* <Header /> */}
            <CustomList
                filters={filters}
                rows={rows}
                getRows={getPickByBatchList}
                loading={loading}
                columns={columns}
                count={PickByBatchTotal}
                header={() => (
                    <Header />
                )}
                handleClickRow={(id) => Router.push(`/pickpack/batchlist/edit/${id}`)}
            />
        </>
    );
};

export default PickByBatchListContent;
