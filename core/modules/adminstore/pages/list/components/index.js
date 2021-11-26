/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/adminstore/pages/list/components/Header';
import Autocomplete from '@common_autocomplete';

const AdminStoreContent = (props) => {
    const { data, loading, getAdminStoreList, groupOptions } = props;
    const adminList = (data && data.getAdminStoreList && data.getAdminStoreList.items) || [];
    const adminTotal = (data && data.getAdminStoreList && data.getAdminStoreList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID', sortable: true },
        { field: 'name', headerName: 'Name', hideable: true, sortable: true },
        { field: 'email', headerName: 'Email', hideable: true, sortable: true },
        { field: 'location', headerName: 'Location', hideable: true, sortable: true },
        { field: 'group_label', headerName: 'Group', hideable: true, sortable: true },
        { field: 'actions', headerName: 'Action', hideable: true },
    ];

    const rows = adminList.map((admin) => ({
        ...admin,
        id: admin.entity_id,
        location: admin.customer_loc_code.join(', '),
        name: `${admin.firstname} ${admin.lastname}`,
        actions: () => (
            <Link href={`/userdata/adminstore/edit/${admin.entity_id}`}>
                <a className="link-button">View</a>
            </Link>
        ),
    }));

    const filters = [
        { field: 'entity_id', name: 'entity_id', type: 'from', label: 'ID from', initialValue: '' },
        { field: 'entity_id', name: 'entity_id', type: 'to', label: 'ID to', initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: 'Name', initialValue: '' },
        { field: 'email', name: 'email', type: 'like', label: 'Email', initialValue: '' },
        {
            field: 'group_id',
            name: 'group_id',
            type: 'like',
            label: 'Group',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const options = groupOptions.slice().map((item) => ({
                    name: item.label,
                    id: item.value,
                }));
                return (
                    <Autocomplete
                        style={{ width: 228 }}
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue.id)}
                        options={options}
                    />
                );
            }
            ,
        },
    ];

    return (
        <>
            <Header />
            <Table
                rows={rows}
                getRows={getAdminStoreList}
                loading={loading}
                columns={columns}
                count={adminTotal}
                filters={filters}
                hideActions
                hideColumns
            />
        </>
    );
};

export default AdminStoreContent;
