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
        { field: 'loc_id', headerName: 'ID' },
        { field: 'loc_code', headerName: 'Code' },
        { field: 'loc_name', headerName: 'Name' },
        { field: 'loc_city', headerName: 'City' },
        { field: 'loc_street', headerName: 'Address' },
        { field: 'actions', headerName: 'Actions' },
    ];

    const rows = locationList.map((location) => ({
        ...location,
        id: location.loc_id,
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
