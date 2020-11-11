/* eslint-disable object-curly-newline */
import React from 'react';
import DataTable from '@common_datatable';

const CompanyListContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const columns = [
        { name: 'company_id', title: 'Id' },
        { name: 'company_code', title: 'Code' },
        { name: 'company_name', title: 'Name' },
    ];

    React.useEffect(() => {
        console.log(companyList);
        const variables = { pageSize: 2, currentPage: 1 };
        getCompanyList({ variables });
        window.getCompanyList = getCompanyList;
    }, []);

    if (!data || loading) {
        return (
            <div>Loading . . .</div>
        );
    }

    return (
        <DataTable
            rows={companyList}
            columns={columns}
        />
    );
};

export default CompanyListContent;
