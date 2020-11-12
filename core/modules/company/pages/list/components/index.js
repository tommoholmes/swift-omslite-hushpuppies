/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import DataTable from '@common_datatable';

const CompanyListContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = data && data.getCompanyList && data.getCompanyList.total_count;
    const initialPageSize = 2;
    const columns = [
        { name: 'company_id', title: 'Id' },
        { name: 'company_code', title: 'Code' },
        { name: 'company_name', title: 'Name' },
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
        <DataTable
            rows={companyList}
            getRows={(params) => getCompanyList({ variables: params })}
            columns={columns}
            pageSize={initialPageSize}
            totalCount={companyTotal}
        />
    );
};

export default CompanyListContent;
