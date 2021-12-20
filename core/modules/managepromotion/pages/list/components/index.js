/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/managepromotion/pages/list/components/Header';

const VendorPromotionListContent = (props) => {
    const { data, loading, getVendorPromotionList } = props;
    const vendorPromotionList = (data && data.getVendorPromotionList && data.getVendorPromotionList.items) || [];
    const vendorPromotionTotal = (data && data.getVendorPromotionList && data.getVendorPromotionList.total_count) || 0;

    const columns = [
        { field: 'rule_id', headerName: 'ID', sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'name', headerName: 'Name', sortable: true, hideable: true },
        { field: 'description', headerName: 'Description', sortable: true, hideable: true },
        { field: 'coupon_code', headerName: 'Coupon Code', sortable: true, hideable: true },
        { field: 'from_date', headerName: 'From Date', hideable: true },
        { field: 'to_date', headerName: 'To Date', hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        { field: 'rule_id', name: 'rule_id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'rule_id', name: 'rule_id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: 'Name', initialValue: '' },
        { field: 'description', name: 'description', type: 'like', label: 'Description', initialValue: '' },
        { field: 'coupon_code', name: 'coupon_code', type: 'like', label: 'Coupon Code', initialValue: '' },
        { field: 'from_date', name: 'from_date', type: 'from', label: 'From Date', initialValue: '', typeInput: 'date' },
        { field: 'to_date', name: 'to_date', type: 'to', label: 'To Date', initialValue: '', typeInput: 'date' },
    ];

    const rows = vendorPromotionList.map((vendorPromotion) => ({
        ...vendorPromotion,
        id: vendorPromotion.rule_id,
        actions: () => (
            <Link href={`/vendorportal/managepromotion/edit/${vendorPromotion.rule_id}`}>
                <a className="link-button">view</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getVendorPromotionList}
                loading={loading}
                columns={columns}
                count={vendorPromotionTotal}
                hideActions
            />
        </>
    );
};

export default VendorPromotionListContent;
