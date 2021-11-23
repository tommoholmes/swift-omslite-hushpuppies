/* eslint-disable object-curly-newline */
import React from 'react';
import CustomList from '@common_customlist';
import Autocomplete from '@common_autocomplete';
import gqlService from '@modules/batchpack/services/graphql';
import Header from '@modules/batchpack/pages/list/components/Header';
import useStyles from '@modules/batchpack/pages/list/components/style';
import Router from 'next/router';

const PickByBatchListContent = (props) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const { data, loading, getStoreShipmentList } = props;
    const PickByBatchList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const PickByBatchTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: 'Shipment Number', sortable: true, hideable: true },
        { field: 'channel_order_date', headerName: 'Date', initialSort: 'ASC', hideable: true },
        { field: 'status', headerName: 'Status', sortable: true, hideable: true },
    ];

    const filters = [
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: 'Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getShipmentStatusByType, getShipmentStatusByTypeRes] = gqlService.getShipmentStatusByType();
                const statusOptions = (getShipmentStatusByTypeRes
                    && getShipmentStatusByTypeRes.data
                    && getShipmentStatusByTypeRes.data.getShipmentStatusByType) || [];
                const primaryKey = 'value';
                const labelKey = 'label';
                return (
                    <Autocomplete
                        mode="lazy"
                        style={{ width: 228 }}
                        getOptions={getShipmentStatusByType}
                        value={statusOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={statusOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'status',
            name: 'status',
            type: 'in',
            label: 'Status',
            initialValue: ['pick_uncomplete', 'ready_for_pack'],
            hidden: true,
        },
    ];

    const getClassByStatus = (status) => {
        if (status.value === 'pick_uncomplete') {
            return classes.red;
        }
        if (status.value === 'pick_in_progress' || status.value === 'pack_in_progress' || status.value === 'ready_for_pack') {
            return classes.orange;
        }
        return classes.gray;
    };

    const rows = PickByBatchList.map((batchlist) => ({
        ...batchlist,
        id: batchlist.entity_id,
        status: () => (
            <span className={getClassByStatus(batchlist.status)}>
                {batchlist.status.label}
            </span>
        ),
        channel_order_date: () => (
            <span>
                {batchlist.channel_order_date}
            </span>
        ),
    }));

    return (
        <>
            <CustomList
                filters={filters}
                rows={rows}
                getRows={getStoreShipmentList}
                loading={loading}
                columns={columns}
                count={PickByBatchTotal}
                showCheckbox
                checkboxAll
                header={() => (
                    <Header />
                )}
                handleClickRow={(id) => Router.push(`/pickpack/batchpack/detail/${id}`)}
                handleChecked={setChecked}
            />
            <div className={classes.footer}>
                {(checked.length !== 0) ? (
                    <button
                        className={classes.btnFooter}
                        type="submit"
                        onClick={() => {
                            const idPrint = checked.map((checkedRow) => checkedRow.id);
                            window.open(`/printoms/pack/${ idPrint.toString().replace(/,/g, '/')}`);
                        }}
                    >
                        Print Pack List
                    </button>
                ) : (
                    <button
                        className={classes.btnFooterDisabled}
                        type="submit"
                        disabled
                    >
                        Print Pack List
                    </button>
                )}
            </div>
        </>
    );
};

export default PickByBatchListContent;
