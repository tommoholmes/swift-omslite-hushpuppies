/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from './Header';

const CompanyListContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: 'Id' },
        { field: 'company_code', headerName: 'Code' },
        { field: 'company_name', headerName: 'Name' },
    ];

    // if (!data || loading) {
    //     return (
    //         <div>Loading . . .</div>
    //     );
    // }

    return (
        <>
            <Header />
            <Table
                rows={companyList}
                getRows={getCompanyList}
                loading={loading}
                columns={columns}
                count={companyTotal}
            />
        </>
    );
};

export default CompanyListContent;
