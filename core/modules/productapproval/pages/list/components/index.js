/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productapproval/pages/list/components/Header';

const ProductApprovalListContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: 'ID' },
        { field: 'company_code', headerName: 'Approval status' },
        { field: 'company_id', headerName: 'SKU' },
        { field: 'company_name', headerName: 'Product Name' },
        { field: 'company_code', headerName: 'Vendor' },
        { field: 'company_id', headerName: 'Price' },
        { field: 'company_id', headerName: 'Special Price' },
        { field: 'company_id', headerName: 'Status' },
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

export default ProductApprovalListContent;
