/* eslint-disable object-curly-newline */
import React from 'react';
import DataTable from '@common_datatable';

const CompanyListContent = (props) => {
    const { data } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];

    React.useEffect(() => {
        console.log(companyList);
    }, []);

    const columns = [
        { name: 'company_id', title: 'Id' },
        { name: 'company_code', title: 'Code' },
        { name: 'company_name', title: 'Name' },
    ];

    return (
        <DataTable
            rows={companyList}
            columns={columns}
        />
    );
};

export default CompanyListContent;
