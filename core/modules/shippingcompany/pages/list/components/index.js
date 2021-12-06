/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/shippingcompany/pages/list/components/Header';
import Autocomplete from '@common_autocomplete';

const ShippingCompanyListContent = (props) => {
    const { data, loading, getTadaShippingCompanyList, multideleteShippingCompany } = props;
    const shippingCompanyList = (data && data.getTadaShippingCompanyList && data.getTadaShippingCompanyList.items) || [];
    const shippingCompanyTotal = (data && data.getTadaShippingCompanyList && data.getTadaShippingCompanyList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', hideable: true, sortable: true, initialSort: 'ASC' },
        { field: 'company_id', headerName: 'Company ID', hideable: true, sortable: true },
        { field: 'brand', headerName: 'Brand', hideable: true, sortable: true },
        { field: 'shipping_method', headerName: 'Shipping Method', hideable: true, sortable: true },
        { field: 'is_active_label', headerName: 'Is Active', hideable: true, sortable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        {
            field: 'id',
            name: 'id_from',
            type: 'from',
            label: 'ID From',
            initialValue: '',
        },
        {
            field: 'id',
            name: 'id_to',
            type: 'to',
            label: 'ID To',
            initialValue: '',
        },
        {
            field: 'company_id',
            name: 'company_id_from',
            type: 'from',
            label: 'Company ID From',
            initialValue: '',
        },
        {
            field: 'company_id',
            name: 'company_id_to',
            type: 'to',
            label: 'Company ID To',
            initialValue: '',
        },
        {
            field: 'brand',
            name: 'brand',
            type: 'like',
            label: 'Brand',
            initialValue: '',
        },
        {
            field: 'shipping_method',
            name: 'shipping_method',
            type: 'like',
            label: 'Shipping Method',
            initialValue: '',
        },
        {
            field: 'is_active',
            name: 'is_active',
            type: 'like',
            label: 'Is Active',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const primaryKey = 'value';
                const labelKey = 'name';
                const options = [
                    {
                        value: '0',
                        name: 'No',
                    },
                    {
                        value: '1',
                        name: 'Yes',
                    },
                ];
                return (
                    <Autocomplete
                        style={{ width: 228 }}
                        value={options.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue[primaryKey]);
                        }}
                        options={options}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
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
                getRows={getTadaShippingCompanyList}
                deleteRows={multideleteShippingCompany}
                loading={loading}
                columns={columns}
                count={shippingCompanyTotal}
                filters={filters}
                showCheckbox
            />
        </>
    );
};

export default ShippingCompanyListContent;
