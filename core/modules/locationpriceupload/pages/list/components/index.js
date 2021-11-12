/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/locationpriceupload/pages/list/components/Header';
import useStyles from '@modules/locationpriceupload/pages/list/components/style';
import TextField from '@common_textfield';

const PriceLocationListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getPriceLocationList } = props;
    const priceLocationList = (data && data.getPriceLocationList && data.getPriceLocationList.items) || [];
    const priceLlocationTotal = (data && data.getPriceLocationList && data.getPriceLocationList.total_count) || 0;

    const columns = [
        { field: 'price_id', headerName: 'ID', sortable: true, hideable: true },
        { field: 'loc_name', headerName: 'Location', sortable: true, hideable: true },
        { field: 'sku', headerName: 'SKU', sortable: true, hideable: true },
        { field: 'special_price', headerName: 'Special Price', sortable: true, hideable: true },
        { field: 'special_from_date', headerName: 'Special Price From', sortable: true, hideable: true },
        { field: 'special_to_date', headerName: 'Special Price To', sortable: true, hideable: true },
    ];

    const filters = [
        { field: 'loc_name', name: 'loc_name', type: 'like', label: 'Location', initialValue: '' },
        { field: 'sku', name: 'sku', type: 'like', label: 'SKU', initialValue: '' },
        { field: 'special_price', name: 'special_price', type: 'like', label: 'Special Price', initialValue: '' },
        {
            field: 'special_from_date',
            name: 'special_from_date',
            type: 'like',
            label: 'Special Price From',
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
                    onChange={(newValue) => {
                        setFilterValue(newValue.target.value);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'special_to_date',
            name: 'special_to_date',
            type: 'like',
            label: 'Special Price To',
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
                    onChange={(newValue) => {
                        setFilterValue(newValue.target.value);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
    ];

    const rows = priceLocationList.map((priceLocation) => ({
        ...priceLocation,
        id: priceLocation.price_id,
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getPriceLocationList}
                loading={loading}
                columns={columns}
                count={priceLlocationTotal}
                hideActions
            />
        </>
    );
};

export default PriceLocationListContent;
