/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productprice/pages/list/components/Header';
import TextField from '@common_textfield';
import useStyles from '@modules/productprice/pages/list/components/Header/style';

const AttributeMappingListContent = (props) => {
    const { data, loading, getMarketplaceProductPriceList, updateMarketplaceProductPriceToMp } = props;
    const classes = useStyles();

    const productPriceList = (data && data.getMarketplaceProductPriceList && data.getMarketplaceProductPriceList.items) || [];
    const productPriceTotal = (data && data.getMarketplaceProductPriceList && data.getMarketplaceProductPriceList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID', sortable: true, hideable: true },
        { field: 'sku', headerName: 'SKU', sortable: true, hideable: true },
        { field: 'channel_code', headerName: 'Channel Code', sortable: true, hideable: true },
        { field: 'price', headerName: 'Price', sortable: true, hideable: true },
        { field: 'updated_at', headerName: 'Updated At', sortable: true, hideable: true },
    ];

    const rows = productPriceList.map((price) => ({
        ...price,
        id: price.entity_id,
    }));

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: 'ID To', initialValue: '' },
        {
            field: 'updated_at',
            name: 'updated_at_from',
            type: 'from',
            label: 'Updated From',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => { setFilterValue(newValue.target.value); }}
                    InputProps={{
                        className: classes.fieldInputFilter,
                    }}
                />
            ),
        },
        {
            field: 'updated_at',
            name: 'updated_at_to',
            type: 'to',
            label: 'Updated To',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => { setFilterValue(newValue.target.value); }}
                    InputProps={{
                        className: classes.fieldInputFilter,
                    }}
                />
            ),
        },
        { field: 'sku', name: 'sku', type: 'like', label: 'SKU', initialValue: '' },
        { field: 'channel_code', name: 'channel_code', type: 'like', label: 'Channel Code', initialValue: '' },
    ];

    const actions = [
        {
            label: 'Update to marketplace',
            message: 'Are you sure to confirm ?',
            onClick: async (checkedRows) => {
                const variables = { sku: checkedRows.map((checkedRow) => checkedRow.sku) };
                await updateMarketplaceProductPriceToMp({ variables }).then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: 'Success update to marketplace',
                        variant: 'success',
                    });
                }).catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
            },
        },
    ];

    return (
        <>
            <Header />
            <Table
                rows={rows}
                getRows={getMarketplaceProductPriceList}
                loading={loading}
                columns={columns}
                filters={filters}
                actions={actions}
                count={productPriceTotal}
                showCheckbox
            />
        </>
    );
};

export default AttributeMappingListContent;
