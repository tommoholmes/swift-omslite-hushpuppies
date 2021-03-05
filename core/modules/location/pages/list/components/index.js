/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from './Header';
// import useStyles from './style';

const LocationListContent = (props) => {
    // const classes = useStyles();
    const { data, loading, getLocationList, multideleteLocation } = props;
    const locationList = (data && data.getLocationList && data.getLocationList.items) || [];
    const locationTotal = (data && data.getLocationList && data.getLocationList.total_count) || 0;

    const columns = [
        { field: 'loc_id', headerName: 'ID', sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'loc_code', headerName: 'Code', sortable: true, hideable: true },
        { field: 'loc_name', headerName: 'Name', hideable: true },
        { field: 'loc_city', headerName: 'City', hideable: true },
        { field: 'loc_street', headerName: 'Address', hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        { field: 'loc_id', name: 'loc_id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'loc_id', name: 'loc_id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'loc_code', name: 'loc_code', type: 'like', label: 'Code', initialValue: '' },
        { field: 'loc_name', name: 'loc_name', type: 'like', label: 'Name', initialValue: '' },
        { field: 'loc_city', name: 'loc_city', type: 'like', label: 'City', initialValue: '' },
        { field: 'loc_street', name: 'loc_street', type: 'like', label: 'Adress', initialValue: '' },
    ];

    const rows = locationList.map((location) => ({
        ...location,
        id: location.loc_id,
        loc_city: location.loc_city.label,
        actions: () => (
            <Link href={`/oms/location/edit/${location.loc_id}`}>
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
                getRows={getLocationList}
                deleteRows={multideleteLocation}
                loading={loading}
                columns={columns}
                count={locationTotal}
                showCheckbox
            />
        </>
    );
};

export default LocationListContent;
