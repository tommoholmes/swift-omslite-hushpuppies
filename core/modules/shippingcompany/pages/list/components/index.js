/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from './Header';

const ShippingCompanyListContent = (props) => {
    const { data, loading, getShippingCompanyList, multideleteShippingCompany } = props;
    const shippingCompanyList = (data && data.getShippingCompanyList && data.getShippingCompanyList.items) || [];
    const shippingCompanyTotal = (data && data.getShippingCompanyList && data.getShippingCompanyList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', hideable: true },
        { field: 'company_id', headerName: 'Company ID', hideable: true },
        { field: 'brand', headerName: 'Brand', hideable: true },
        { field: 'shipping_method', headerName: 'Shipping Method', hideable: true },
        { field: 'is_active', headerName: 'Is Active', hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const rows = shippingCompanyList.map((shippingcompany) => ({
        ...shippingcompany,
        id: shippingcompany.id,
        actions: () => (
            <Link href={`/tada/shippingcompany/edit/${shippingcompany.id}`}>
                <a className="link-button">Edit</a>
            </Link>
        ),
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
                getRows={getShippingCompanyList}
                deleteRows={multideleteShippingCompany}
                loading={loading}
                columns={columns}
                count={shippingCompanyTotal}
                showCheckbox
            />
        </>
    );
};

export default ShippingCompanyListContent;
