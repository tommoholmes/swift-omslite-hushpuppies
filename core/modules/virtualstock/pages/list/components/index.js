/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from './Header';
import useStyles from './style';

const VirtualStockListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getVirtualStockList, multideleteVirtualStock } = props;
    const virtualStockList = (data && data.getVirtualStockList && data.getVirtualStockList.items) || [];
    const virtualStockTotal = (data && data.getVirtualStockList && data.getVirtualStockList.total_count) || 0;

    const columns = [
        { field: 'vs_id', headerName: 'ID', sortable: true, initialSort: 'ASC' },
        { field: 'vs_name', headerName: 'Name', sortable: true },
        { field: 'actions', headerName: 'Actions' },
    ];

    const filters = [
        { field: 'vs_id', name: 'vs_id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'vs_id', name: 'vs_id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'vs_name', name: 'vs_name', type: 'like', label: 'Name', initialValue: '' },
    ];

    const rows = virtualStockList.map((virtualStock) => ({
        ...virtualStock,
        id: virtualStock.vs_id,
        actions: () => (
            <Link href={`/cataloginventory/virtualstock/edit/${virtualStock.vs_id}`}>
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
                getRows={getVirtualStockList}
                deleteRows={multideleteVirtualStock}
                loading={loading}
                columns={columns}
                count={virtualStockTotal}
                showCheckbox
            />
        </>
    );
};

export default VirtualStockListContent;
