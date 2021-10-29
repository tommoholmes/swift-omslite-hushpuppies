/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/virtuallocationinventory/pages/list/components/Header';

const VirtualLocationListContent = (props) => {
    const { data, loading, getVirtualLocationList, deleteMultipleRowsHandle } = props;
    const virtualLocationList = (data && data.getVirtualLocationList && data.getVirtualLocationList.items) || [];
    const virtualLocationTotal = (data && data.getVirtualLocationList && data.getVirtualLocationList.total_count) || 0;

    const columns = [
        { field: 'vl_id', headerName: 'ID', sortable: true, initialSort: 'ASC' },
        { field: 'parentLocation', headerName: 'Parent Location', hideable: true },
        { field: 'virtualLocation', headerName: 'Virtual Location', hideable: true },
        { field: 'percentage', headerName: 'Percentage', hideable: true, sortable: true },
        { field: 'priority', headerName: 'Priority', hideable: true, sortable: true },
        { field: 'actions', headerName: 'Actions' },
    ];

    const filters = [
        { field: 'vl_id', name: 'vl_id', type: 'like', label: 'ID', initialValue: '' },
        { field: 'parent_location', name: 'parent_location', type: 'like', label: 'Parent Location', initialValue: '' },
        { field: 'virtual_location', name: 'virtual_location', type: 'like', label: 'Virtual Location', initialValue: '' },
        { field: 'percentage', name: 'percentage', type: 'like', label: 'Percentage', initialValue: '' },
        { field: 'priority', name: 'priority', type: 'like', label: 'Priority', initialValue: '' },
    ];

    const rows = virtualLocationList.map((virtualLocation) => ({
        ...virtualLocation,
        id: virtualLocation.vl_id,
        parentLocation: virtualLocation.parent_label.label,
        virtualLocation: virtualLocation.virtual_label.label,
        actions: () => (
            <Link href={`/cataloginventory/virtuallocationinventory/edit/${virtualLocation.vl_id}`}>
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
                getRows={getVirtualLocationList}
                loading={loading}
                columns={columns}
                count={virtualLocationTotal}
                deleteRows={deleteMultipleRowsHandle}
                showCheckbox
            />
        </>
    );
};

export default VirtualLocationListContent;
