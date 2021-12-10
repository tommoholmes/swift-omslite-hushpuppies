/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/productpromo/pages/list/components/Header';
import TextField from '@common_textfield';
import useStyles from '@modules/productpromo/pages/list/components/style';

const ProductPromoListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getMarketplaceProductPromoList, updateMarketplaceProductPromoToMp } = props;
    const productPromoList = (data && data.getMarketplaceProductPromoList && data.getMarketplaceProductPromoList.items) || [];
    const productPromoTotal = (data && data.getMarketplaceProductPromoList && data.getMarketplaceProductPromoList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID', sortable: true, hideable: true },
        { field: 'channel_store_id', headerName: 'Channel Store Id', hideable: true },
        { field: 'name', headerName: 'Promo Name', sortable: true, hideable: true },
        { field: 'start_date', headerName: 'Start Date', sortable: true, hideable: true },
        { field: 'end_date', headerName: 'End Date', sortable: true, hideable: true },
        { field: 'updated_at', headerName: 'Updated At', hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'entity_id', name: 'id_to', type: 'to', label: 'ID To', initialValue: '' },
        {
            field: 'start_date',
            name: 'start_date_from',
            type: 'from',
            label: 'Start Date From',
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
            field: 'start_date',
            name: 'start_date_to',
            type: 'to',
            label: 'Start Date To',
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
            field: 'end_date',
            name: 'end_date_from',
            type: 'from',
            label: 'End Date From',
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
            field: 'end_date',
            name: 'end_date_to',
            type: 'to',
            label: 'End Date To',
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
        { field: 'name', name: 'name', type: 'like', label: 'Promo Name', initialValue: '' },
    ];

    const rows = productPromoList.map((productPromo) => ({
        ...productPromo,
        id: productPromo.entity_id,
        actions: () => (
            <Link href={`/marketplace/productpromo/item/${productPromo.entity_id}`}>
                <a className="link-button">view</a>
            </Link>
        ),
    }));

    const actions = [
        {
            label: 'Update to marketplace',
            message: 'Are you sure you want to update?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await updateMarketplaceProductPromoToMp({ variables });
            },

            confirmDialog: true,
            showMessage: true,
        },
    ];

    return (
        <>
            <Header />
            <Table
                filters={filters}
                actions={actions}
                rows={rows}
                getRows={getMarketplaceProductPromoList}
                loading={loading}
                columns={columns}
                count={productPromoTotal}
                showCheckbox
            />
        </>
    );
};

export default ProductPromoListContent;
