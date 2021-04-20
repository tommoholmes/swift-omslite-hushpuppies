/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from './Header';

const StockTransferListContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: 'ID' },
        { field: 'company_code', headerName: 'Source Location Code' },
        { field: 'company_code', headerName: 'Target Location Code' },
        { field: 'company_name', headerName: 'Status' },
        { field: 'company_name', headerName: 'Created By' },
        { field: 'company_name', headerName: 'Created At' },
        { field: 'company_name', headerName: 'Confirmed By' },
        { field: 'company_name', headerName: 'Confirmed At' },
        { field: 'actions', headerName: 'Action' },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.company_id,
        actions: () => (
            <Link href={`/cataloginventory/stocktransfer/edit/${company.company_id}`}>
                <a className="link-button">View</a>
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
            />
        </>
    );
};

export default StockTransferListContent;
