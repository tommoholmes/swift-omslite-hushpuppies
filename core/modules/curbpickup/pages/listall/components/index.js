/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/curbpickup/pages/listall/components/Header';
import useStyles from '@modules/curbpickup/pages/listall/components/style';

const CurbPickupListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getCurbPickupList, confirmPickShipment, packShipment, pickedupShipment } = props;
    const curbPickupList = (data && data.getCurbPickupList && data.getCurbPickupList.items) || [];
    const curbPickupTotal = (data && data.getCurbPickupList && data.getCurbPickupList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: 'Shipment Number', hideable: true },
        { field: 'status', headerName: 'Status', hideable: true },
        { field: 'loc_name', headerName: 'Location', hideable: true },
        { field: 'shipping_telephone', headerName: 'Phone Number', hideable: true },
        { field: 'shipping_name', headerName: 'Recipient Name', hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        { field: 'status', name: 'status', type: 'neq', label: 'Status(not)', initialValue: 'customer_waiting' },
        { field: 'Shipment Number', name: 'increment_id', type: 'like', label: 'Increment ID', initialValue: '' },
        { field: 'loc_name', name: 'loc_name', type: 'like', label: 'Location', initialValue: '' },
        { field: 'shipping_telephone', name: 'shipping_telephone', type: 'like', label: 'Phone Number', initialValue: '' },
        { field: 'shipping_name', name: 'shipping_name', type: 'like', label: 'Recipient Name', initialValue: '' },
    ];

    const getClassByStatus = (status) => {
        if (status === 'Process for Pack' || status === 'Process for Shipping' || status === 'Cannot Fulfill') {
            return classes.process;
        }
        if (status === 'Ready for Pack') {
            return classes.readyPack;
        }
        if (status === 'Ready for Pickup') {
            return classes.readyPickup;
        }
        if (status === 'Customer Picked Up') {
            return classes.customerPicked;
        }
        return classes.waiting;
    };

    const actions = [
        {
            label: 'Mark Confirm Complete',
            message: 'Are you sure to confirm ?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await confirmPickShipment({ variables });
            },
        },
        {
            label: 'Mark Pack Complete',
            message: 'Are you ready for pack?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await packShipment({ variables });
            },
        },
        {
            label: 'Mark Picked Up Complete',
            message: 'Are you sure to picked up this order?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await pickedupShipment({ variables });
            },
        },
        {
            label: 'Print Pick List',
            message: 'ready for print?',
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/shipment/curbpickup/print/${ idPrint.toString().replace(/,/g, '/')}`);
            },
        },
        {
            label: 'Print Pack List',
            message: 'ready for print?',
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/shipment/curbpickup/printpack/${ idPrint.toString().replace(/,/g, '/')}`);
            },
        },
    ];

    const rows = curbPickupList.map((curbPickup) => ({
        ...curbPickup,
        id: curbPickup.entity_id,
        status: () => (
            <div className={getClassByStatus(curbPickup.status.label)}>
                {curbPickup.status.label}
            </div>
        ),
        actions: () => (
            <Link href={`/shipment/curbpickup/edit/${curbPickup.entity_id}`}>
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
                actions={actions}
                rows={rows}
                getRows={getCurbPickupList}
                loading={loading}
                columns={columns}
                count={curbPickupTotal}
                showCheckbox
            />
        </>
    );
};

export default CurbPickupListContent;
