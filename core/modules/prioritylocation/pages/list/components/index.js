/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from './Header';
import useStyles from './style';

const PriorityLocationListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getPriorityLocationList, multideletePriorityLocation } = props;
    const priorityLocationList = (data && data.getPriorityLocationList && data.getPriorityLocationList.items) || [];
    const priorityLocationTotal = (data && data.getPriorityLocationList && data.getPriorityLocationList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true, initialSort: 'ASC' },
        { field: 'channel_code', headerName: 'Channel Code', sortable: true, hideable: true },
        { field: 'province', headerName: 'Province', sortable: true, hideable: true },
        { field: 'city', headerName: 'City', sortable: true, hideable: true },
        { field: 'priority', headerName: 'Priority', sortable: true, hideable: true },
        { field: 'loc_code', headerName: 'Location Code', sortable: true, hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: 'No From', initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: 'No To', initialValue: '' },
        { field: 'channel_code', name: 'channel_code', type: 'match', label: 'Channel Code', initialValue: '' },
        { field: 'province', name: 'province', type: 'match', label: 'Province', initialValue: '' },
        { field: 'city', name: 'city', type: 'match', label: 'City', initialValue: '' },
        { field: 'priority', name: 'priority', type: 'match', label: 'Priority', initialValue: '' },
        { field: 'loc_code', name: 'loc_code', type: 'match', label: 'Location Code', initialValue: '' },
        // { field: 'channel_url', name: 'channel_url', type: 'eq', label: 'Channel Url', initialValue: '' },
    ];

    const rows = priorityLocationList.map((priorityLocation) => ({
        ...priorityLocation,
        id: priorityLocation.id,
        actions: () => (
            <Link href={`/oms/prioritylocation/edit/${priorityLocation.id}`}>
                <a className="link-button">view</a>
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
            <Table
                filters={filters}
                rows={rows}
                getRows={getPriorityLocationList}
                deleteRows={multideletePriorityLocation}
                loading={loading}
                columns={columns}
                count={priorityLocationTotal}
                showCheckbox
            />
        </>
    );
};

export default PriorityLocationListContent;
