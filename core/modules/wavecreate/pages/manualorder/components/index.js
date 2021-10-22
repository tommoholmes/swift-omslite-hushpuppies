/* eslint-disable object-curly-newline */
import React from 'react';
import CustomList from '@common_customlist';
import Header from '@modules/wavecreate/pages/manualorder/components/Header';
import useStyles from '@modules/wavecreate/pages/manualorder/components/style';

const PickByWaveListContent = (props) => {
    const { data, loading, getStoreShipmentList, startPicking } = props;
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const PickByWaveList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const PickByWaveTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;

    const columns = [
        { field: 'order_number', headerName: 'Order Number', sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'shipping_label', headerName: 'Shipping Method', hideable: true },
        { field: 'channel', headerName: 'Channel', sortable: true, hideable: true },
    ];

    const filters = [
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: 'Status',
            initialValue: 'process_for_shipping',
            hidden: true,
        },
        {
            field: 'allocation_status',
            name: 'allocation_status',
            type: 'eq',
            label: 'allocation_status',
            initialValue: 'confirmed',
            hidden: true,
        },
        {
            field: 'channel_order_increment_id',
            name: 'channel_order_increment_id',
            type: 'like',
            label: 'Order Number',
            initialValue: '',
        },
        {
            field: 'channel_shipping_label',
            name: 'channel_shipping_label',
            type: 'match',
            label: 'Shipping Method',
            initialValue: '',
        },
        {
            field: 'channel_name',
            name: 'channel_name',
            type: 'like',
            label: 'Channel',
            initialValue: '',
        },
    ];

    const rows = PickByWaveList.map((wavelist) => ({
        ...wavelist,
        id: wavelist.entity_id,
        order_number: wavelist.channel_order_increment_id,
        shipping_label: wavelist.channel_shipping_label.split('_').join(' '),
        channel: wavelist.channel.channel_name,
    }));

    return (
        <>
            <CustomList
                filters={filters}
                rows={rows}
                getRows={getStoreShipmentList}
                loading={loading}
                columns={columns}
                count={PickByWaveTotal}
                header={() => (
                    <Header />
                )}
                showCheckbox
                handleChecked={setChecked}
            />
            <div className={classes.footer}>
                {(checked.length !== 0) ? (
                    <button
                        className={classes.btnFooter}
                        type="submit"
                        onClick={() => startPicking(checked)}
                    >
                        Start Picking
                    </button>
                ) : (
                    <button
                        className={classes.btnFooterDisabled}
                        type="submit"
                        disabled
                    >
                        Start Picking
                    </button>
                )}
                <div style={{ width: '60%', display: 'inline-block', padding: 20 }}>
                    <span>
                        {checked.length}
                        {' '}
                        Order selected
                    </span>
                </div>
            </div>
        </>
    );
};

export default PickByWaveListContent;
