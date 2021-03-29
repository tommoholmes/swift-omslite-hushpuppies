/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from './Header';

const WarehouseListContent = (props) => {
    const { data, loading, getCompanyList, multideleteCompany } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: 'ID' },
        { field: 'company_name', headerName: 'Marketplace' },
        { field: 'company_code', headerName: 'Marketplace Warehouse ID' },
        { field: 'company_name', headerName: 'Location' },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.company_id,
        actions: () => (
            <Link href={`/marketplace/warehouse/edit/${company.company_id}`}>
                <a className="link-button">Edit</a>
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

export default WarehouseListContent;
