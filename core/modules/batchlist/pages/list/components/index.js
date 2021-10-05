/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import CustomList from '@common_customlist';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import { optionsStatus } from '@modules/batchlist/helpers';
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
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        {
            field: 'status',
            name: 'status',
            type: 'like',
            label: 'Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    style={{ width: 228 }}
                    value={optionsStatus.find((e) => e.id === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.id)}
                    options={optionsStatus}
                />
            ),
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
        return classes.grey;
    };

    const rows = PickByBatchList.map((batchlist) => ({
        ...batchlist,
        id: batchlist.entity_id,
        status: () => (
            <span className={getClassByStatus(batchlist.status)}>
                {batchlist.status.label}
            </span>
        ),
        // status: batchlist.status.label,
        actions: () => (
            <Link href={`/pickpack/batchlist/edit/${batchlist.entity_id}`}>
                <a className="link-button">View</a>
            </Link>
        ),
    }));

    // if (!data || loading) {
    //     return (
    //         <div>Loading . . .</div>
    //     );
    // }

    return (
        <>
            <Header />
            <CustomList
                filters={filters}
                rows={rows}
                getRows={getPickByBatchList}
                loading={loading}
                columns={columns}
                count={PickByBatchTotal}
            />
            {/* <Table
                filters={filters}
                rows={rows}
                getRows={getPickByBatchList}
                loading={loading}
                columns={columns}
                count={PickByBatchTotal}
            /> */}
        </>
    );
};

export default PickByBatchListContent;
