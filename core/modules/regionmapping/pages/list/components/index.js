/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import TextField from '@common_textfield';
import Header from '@modules/regionmapping/pages/list/components/Header';
import useStyles from '@modules/regionmapping/pages/list/components/style';

const RegionChannelListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getChannelRegionList, deleteChannelRegions } = props;
    const regionList = (data && data.getChannelRegionList && data.getChannelRegionList.items) || [];
    const regionTotal = (data && data.getChannelRegionList && data.getChannelRegionList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'region_raw', headerName: 'Region Raw', sortable: true, hideable: true },
        { field: 'code', headerName: 'Code', sortable: true, hideable: true },
        { field: 'created_at', headerName: 'Created At', sortable: true, hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: 'ID To', initialValue: '' },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: 'Created From',
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
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: 'Created To',
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
        { field: 'region_raw', name: 'region_raw', type: 'like', label: 'Channel Code', initialValue: '' },
        { field: 'code', name: 'code', type: 'like', label: 'Code', initialValue: '' },
    ];

    const rows = regionList.map((region) => ({
        ...region,
        actions: () => (
            <Link href={`/configurations/regionmapping/edit/${region.id}`}>
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
                getRows={getChannelRegionList}
                deleteRows={deleteChannelRegions}
                loading={loading}
                columns={columns}
                count={regionTotal}
                showCheckbox
            />
        </>
    );
};

export default RegionChannelListContent;
