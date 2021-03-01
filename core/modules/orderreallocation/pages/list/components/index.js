/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from './Header';

const CompanyListContent = (props) => {
    const { data, loading, getCompanyList, multideleteCompany } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: 'Shipment Number' },
        { field: 'company_id', headerName: 'Order Number' },
        { field: 'company_id', headerName: 'Channel Order Number', hideable: true },
        { field: 'company_id', headerName: 'Order Date', hideable: true },
        { field: 'company_id', headerName: 'Recipient Name', hideable: true },
        { field: 'company_id', headerName: 'Billing Name', hideable: true },
        { field: 'company_id', headerName: 'Email Address', hideable: true },
        { field: 'company_id', headerName: 'Phone', hideable: true },
        { field: 'company_id', headerName: 'Status', hideable: true },
        { field: 'company_id', headerName: 'Location Name', hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.company_id,
        actions: () => (
            <Link href={`/sales/orderreallocation/edit/${company.company_id}`}>
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
                deleteRows={multideleteCompany}
                loading={loading}
                columns={columns}
                count={companyTotal}
                showCheckbox
            />
        </>
    );
};

export default CompanyListContent;
