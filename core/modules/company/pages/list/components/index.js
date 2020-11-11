/* eslint-disable object-curly-newline */
import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const CompanyListContent = (props) => {
    const { data } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];

    React.useEffect(() => {
        console.log(companyList);
    }, []);

    const columns = [
        { field: 'company_id', headerName: 'Id' },
        { field: 'company_code', headerName: 'Code' },
        { field: 'company_name', headerName: 'Name' },
    ];

    const rows = companyList.map(
        (company) => ({ id: company.company_id, ...company }),
    );

    return (
        <div style={{ minHeight: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
            />
        </div>
    );
};

export default CompanyListContent;
