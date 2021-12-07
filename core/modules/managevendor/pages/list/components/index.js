/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/managevendor/pages/list/components/Header';

const ManageVendorListContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: 'ID', hideable: true, sortable: true, initialSort: 'ASC' },
        { field: 'company_code', headerName: 'Vendor Code', hideable: true, sortable: true },
        { field: 'company_name', headerName: 'Vendor Name', hideable: true, sortable: true },
        { field: 'actions', headerName: 'Action', hideable: true, sortable: true },
    ];

    const filters = [
        { field: 'company_id', name: 'company_id', type: 'from', label: 'ID', initialValue: '' },
        { field: 'company_code', name: 'company_code', type: 'like', label: 'Vendor Code', initialValue: '' },
        { field: 'company_name', name: 'company_name', type: 'like', label: 'Vendor Name', initialValue: '' },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.company_id,
        actions: () => (
            <Link href={`/vendorportal/managevendor/edit/${company.company_id}`}>
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
                getRows={getCompanyList}
                loading={loading}
                columns={columns}
                count={companyTotal}
                filters={filters}
                hideActions
            />
        </>
    );
};

export default ManageVendorListContent;
