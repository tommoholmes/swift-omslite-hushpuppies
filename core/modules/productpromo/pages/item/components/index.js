/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productpromo/pages/item/components/Header';
import TextField from '@common_textfield';
import useStyles from '@modules/productpromo/pages/list/components/style';

const ProductPromoItemListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getMarketplaceProductPromoItemsList } = props;
    const productPromoItemList = (data && data.getMarketplaceProductPromoItemsList && data.getMarketplaceProductPromoItemsList.items) || [];
    const productPromoItemTotal = (data && data.getMarketplaceProductPromoItemsList && data.getMarketplaceProductPromoItemsList.total_count) || 0;

    const columns = [
        { field: 'sku', headerName: 'SKU', sortable: true, hideable: true },
        { field: 'channel_code', headerName: 'Channel Code', sortable: true, hideable: true },
        { field: 'discount_type', headerName: 'Discount Type', sortable: true, hideable: true },
        { field: 'discount_value', headerName: 'Discount Value', sortable: true, hideable: true },
        { field: 'max_order', headerName: 'Max Order', sortable: true, hideable: true },
        { field: 'updated_at', headerName: 'Updated At', sortable: true, hideable: true },
    ];

    const filters = [
        {
            field: 'updated_at',
            name: 'updated_at_from',
            type: 'from',
            label: 'Updated at From',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => { setFilterValue(newValue.target.value); }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),

        },
        {
            field: 'updated_at',
            name: 'updated_at_to',
            type: 'to',
            label: 'Updated at To',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => { setFilterValue(newValue.target.value); }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'sku', name: 'sku', type: 'like', label: 'SKU', initialValue: '' },
        { field: 'channel_code', name: 'channel_code', type: 'like', label: 'Channel Code', initialValue: '' },
        { field: 'discount_type', name: 'discount_type', type: 'like', label: 'Discount Type', initialValue: '' },
        { field: 'max_order', name: 'max_order', type: 'like', label: 'Max Order', initialValue: '' },
    ];

    const rows = productPromoItemList.map((productPromo) => ({
        ...productPromo,
        id: productPromo.entity_id,
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getMarketplaceProductPromoItemsList}
                loading={loading}
                columns={columns}
                count={productPromoItemTotal}
                hideActions
            />
        </>
    );
};

export default ProductPromoItemListContent;
