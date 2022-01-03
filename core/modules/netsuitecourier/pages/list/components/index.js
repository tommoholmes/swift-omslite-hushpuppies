import React from 'react';
import Table from '@common_table';
import Header from '@modules/netsuitecourier/pages/list/components/Header';
import Link from 'next/link';

const NetsuiteCourierList = (props) => {
    const { getNetsuiteCourierList, data, loading } = props;

    const netsuiteCourierList = (data && data.getNetsuiteCourierList && data.getNetsuiteCourierList.items) || [];
    const totalRecord = (data && data.getNetsuiteCourierList && data.getNetsuiteCourierList.total_count) || 0;

    const columns = [
        {
            field: 'entity_id',
            headerName: 'ID',
            sortable: true,
            hideable: true,
            initialSort: 'ASC',
        },
        {
            field: 'code',
            headerName: 'Code',
            sortable: true,
            hideable: true,
        },
        {
            field: 'courier',
            headerName: 'Raw Courier',
            sortable: true,
            hideable: true,
        },
        {
            field: 'delivery_method',
            headerName: 'Delivery Method',
            sortable: true,
            hideable: true,
        },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        {
            field: 'entity_id',
            name: 'entity_id_from',
            type: 'from',
            label: 'ID From',
            initialValue: '',
        },
        {
            field: 'entity_id',
            name: 'entity_id_to',
            type: 'to',
            label: 'ID To ',
            initialValue: '',
        },
        {
            field: 'code',
            name: 'code',
            type: 'like',
            label: 'Code',
            initialValue: '',
        },
        {
            field: 'courier',
            name: 'courier',
            type: 'like',
            label: 'Raw Courier',
            initialValue: '',
        },
        {
            field: 'delivery_method',
            name: 'delivery_method',
            type: 'like',
            label: 'Delivery Method',
            initialValue: '',
        },
    ];

    const rows = netsuiteCourierList.map((feature) => ({
        ...feature,
        code_courier: feature.code,
        id: feature.entity_id,
        actions: () => (
            <Link href={`/configurations/netsuitecourier/edit/${feature.entity_id}`}>
                <a className="link-button">View</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                getRows={getNetsuiteCourierList}
                loading={loading}
                rows={rows}
                count={totalRecord}
                columns={columns}
                hideActions
            />
        </>
    );
};

export default NetsuiteCourierList;
