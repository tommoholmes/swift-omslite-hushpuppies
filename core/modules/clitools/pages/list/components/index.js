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
        { field: 'company_id', headerName: 'ID', sortable: true },
        { field: 'company_code', headerName: 'Title' },
        { field: 'company_code', headerName: 'Status', hideable: true },
        { field: 'company_code', headerName: 'Created At', hideable: true },
        { field: 'company_code', headerName: 'Execute At', hideable: true },
        { field: 'company_code', headerName: 'Finished At', hideable: true },
        { field: 'company_code', headerName: 'Command', hideable: true },
        // { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.company_id,
        // actions: () => (
        //     <Link href={`/oms/company/edit/${company.company_id}`}>
        //         <a className="link-button">view</a>
        //     </Link>
        // ),
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
