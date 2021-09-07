/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/history/pages/list/components/Header';

const CompanyListContent = (props) => {
    const { data, loading, getCompanyList, multideleteCompany } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: 'Id' },
        { field: 'company_code', headerName: 'Type' },
        { field: 'company_code', headerName: 'Message', hideable: true },
        { field: 'company_code', headerName: 'Status', hideable: true },
        { field: 'company_code', headerName: 'Created at', hideable: true },
        { field: 'company_code', headerName: 'Last Trigered by', hideable: true },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.company_id,
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
