/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import Tabs from '@common_tabs';
import Header from '@modules/requestvendor/pages/list/components/Header';
import { optionsStatus, dataTab } from '@modules/requestvendor/helpers';

const RequestVendorListContent = (props) => {
    const { data, loading, getVendorRequestList } = props;
    const vendorRequestList = (data && data.getVendorRequestList && data.getVendorRequestList.items) || [];
    const vendorRequestTotal = (data && data.getVendorRequestList && data.getVendorRequestList.total_count) || 0;
    const [tab, setTab] = React.useState('pending');
    const [load, setLoad] = React.useState(false);

    const columns = [
        { field: 'entity_id', headerName: 'ID', sortable: true, initialSort: 'ASC' },
        { field: 'first_name', headerName: 'Firstname', sortable: true },
        { field: 'last_name', headerName: 'Lastname', sortable: true },
        { field: 'company_code', headerName: 'Company Code', sortable: true },
        { field: 'company_name', headerName: 'Company Name', sortable: true },
        { field: 'status_label', headerName: 'Status Approval', sortable: true },
        { field: 'actions', headerName: 'Action', hideable: true },
    ];

    const filters = [
        { field: 'first_name', name: 'first_name', type: 'like', label: 'Firstname', initialValue: '' },
        { field: 'last_name', name: 'last_name', type: 'like', label: 'Lastname', initialValue: '' },
        { field: 'company_code', name: 'company_code', type: 'like', label: 'Company Code', initialValue: '' },
        { field: 'company_name', name: 'company_name', type: 'like', label: 'Company Name', initialValue: '' },
        { field: 'status',
            name: 'status',
            type: 'in',
            label: 'Status',
            initialValue: tab,
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

    const rows = vendorRequestList.map((vendorRequest) => ({
        ...vendorRequest,
        id: vendorRequest.entity_id,
        actions: () => (
            <Link href={`/vendorportal/requestvendor/edit/${vendorRequest.entity_id}`}>
                <a className="link-button">view</a>
            </Link>
        ),
    }));

    const onChangeTab = async (e, v) => {
        setLoad(true);
        await setTab(v);
        setLoad(false);
    };

    return (
        <>
            <Header />
            <Tabs data={dataTab} onChange={onChangeTab} value={tab} allItems={false} />
            {!load && (
                <Table
                    filters={filters}
                    rows={rows}
                    getRows={getVendorRequestList}
                    loading={loading}
                    columns={columns}
                    count={vendorRequestTotal}
                    hideActions
                    hideColumns
                />
            )}
        </>
    );
};

export default RequestVendorListContent;
