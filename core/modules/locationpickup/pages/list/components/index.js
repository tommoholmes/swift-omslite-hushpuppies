/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/locationpickup/pages/list/components/Header';

const LocationPickupListContent = (props) => {
    const { data, loading, getLocationPickupList, deleteMultipleRowsHandle } = props;
    const locationList = (data && data.getLocationPickupList && data.getLocationPickupList.items) || [];
    const locationTotal = (data && data.getLocationPickupList && data.getLocationPickupList.total_count) || 0;

    const columns = [
        { field: 'pickup_id', headerName: 'ID', sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'loc_name', headerName: 'Parent Location', sortable: true, hideable: true },
        { field: 'pickup_name', headerName: 'Pickup Name', sortable: true, hideable: true },
        { field: 'pickup_type', headerName: 'Pickup Type', sortable: true, hideable: true },
        { field: 'pickup_description', headerName: 'Pickup Description', sortable: true, hideable: true },
        { field: 'pickup_phone', headerName: 'Pickup Phone', sortable: true, hideable: true },
        { field: 'pickup_charge', headerName: 'Pickup Charge', sortable: true, hideable: true },
        { field: 'pickup_fulfillment_time', headerName: 'Pickup FulFillment Time', sortable: true, hideable: true },
        { field: 'status', headerName: 'Status', sortable: true, hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        { field: 'loc_name', name: 'loc_name', type: 'like', label: 'Parent Location', initialValue: '' },
        { field: 'pickup_name', name: 'pickup_name', type: 'like', label: 'Pickup Name', initialValue: '' },
        { field: 'pickup_type', name: 'pickup_type', type: 'like', label: 'Pickup Type', initialValue: '' },
        { field: 'pickup_description', name: 'pickup_description', type: 'like', label: 'Pickup Description', initialValue: '' },
        { field: 'pickup_phone', name: 'pickup_phone', type: 'like', label: 'Pickup Phone', initialValue: '' },
        { field: 'pickup_charge', name: 'pickup_charge', type: 'like', label: 'Pickup Charge', initialValue: '' },
        { field: 'pickup_fulfillment_time', name: 'pickup_fulfillment_time', type: 'like', label: 'Pickup FulFillment Time', initialValue: '' },
        { field: 'status', name: 'status', type: 'like', label: 'Status', initialValue: '' },
    ];

    const rows = locationList.map((locationpickup) => ({
        ...locationpickup,
        id: locationpickup.pickup_id,
        actions: () => (
            <Link href={`/oms/locationpickup/${locationpickup.pickup_id}/edit`}>
                <a className="link-button">view</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getLocationPickupList}
                deleteRows={deleteMultipleRowsHandle}
                loading={loading}
                columns={columns}
                count={locationTotal}
                showCheckbox
            />
        </>
    );
};

export default LocationPickupListContent;
