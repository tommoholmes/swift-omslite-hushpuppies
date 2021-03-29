/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from './Header';

const ProductMappingListContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: 'ID' },
        { field: 'company_code', headerName: 'Marketplace Code' },
        { field: 'company_code', headerName: 'Marketplace Category' },
        { field: 'company_name', headerName: 'Marketplace Attribute Name' },
        { field: 'company_code', headerName: 'Attribute Code' },
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
                loading={loading}
                columns={columns}
                count={companyTotal}
                showCheckbox
            />
        </>
    );
};

export default ProductMappingListContent;
