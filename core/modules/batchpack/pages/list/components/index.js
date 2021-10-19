/* eslint-disable object-curly-newline */
import React from 'react';
import CustomList from '@common_customlist';
import Autocomplete from '@common_autocomplete';
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
        { field: 'increment_id', headerName: 'Shipment Number', sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'channel_order_date', headerName: 'Date', hideable: true },
        { field: 'status', headerName: 'Status', sortable: true, hideable: true },
    ];

    const optionsStatus = [
        { name: 'Pick Uncomplete', id: 'pick_uncomplete' },
        { name: 'Pick Complete', id: 'pick_complete' },
        { name: 'Pack in Progress', id: 'pack_in_progress' },
        { name: 'Ready for Pack', id: 'ready_for_pack' },
        { name: 'Pack Complete', id: 'pack_complete' },
        { name: 'Ready for Ship', id: 'ready_for_ship' },
        { name: 'Cannot Fulfill', id: 'cannot_fulfill' },
        { name: 'Process for Shipping', id: 'process_for_shipping' },
        { name: 'Pick in Progress', id: 'pick_in_progress' },
    ];

    const filters = [
        // {
        //     field: 'status',
        //     name: 'status',
        //     type: 'in',
        //     label: 'Status',
        //     initialValue: '',
        //     component: ({ filterValue, setFilterValue }) => (
        //         <Autocomplete
        //             style={{ width: 228 }}
        //             multiple
        //             value={(filterValue || []).map((option) => optionsStatus.find((e) => e.id === option))}
        //             onChange={(newValue) => setFilterValue((newValue || []).map((option) => option && option.id))}
        //             options={optionsStatus}
        //         />
        //     ),
        // },
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: 'Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    style={{ width: 228 }}
                    value={optionsStatus.find((e) => e.id === filterValue)}
                    onChange={(newValue) => {
                        setTimeout(() => { setFilterValue(newValue && newValue.id); }, 500);
                    }}
                    options={optionsStatus}
                />
            ),
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
        if (status.value === 'pick_in_progress' || status.value === 'pack_in_progress') {
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
