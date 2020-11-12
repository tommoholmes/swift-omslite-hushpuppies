/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';

const CompanyListContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = data && data.getCompanyList && data.getCompanyList.total_count;
    const initialPageSize = 2;
    // const columns = [
    //     { name: 'company_id', title: 'Id' },
    //     { name: 'company_code', title: 'Code' },
    //     { name: 'company_name', title: 'Name' },
    // ];
    const columns = [
        { field: 'company_id', headerName: 'Id' },
        { field: 'company_code', headerName: 'Code' },
        { field: 'company_name', headerName: 'Name' },
    ];

    React.useEffect(() => {
        const variables = { pageSize: initialPageSize, currentPage: 1 };
        getCompanyList({ variables });
    }, []);

    // if (!data || loading) {
    //     return (
    //         <div>Loading . . .</div>
    //     );
    // }

    return (
        // <DataTable
        //     rows={companyList}
        //     getRows={(params) => getCompanyList({ variables: params })}
        //     columns={columns}
        //     pageSize={initialPageSize}
        //     totalCount={companyTotal}
        // />
        <Table
            rows={companyList}
            columns={columns}
        />
    );
};

export default CompanyListContent;
