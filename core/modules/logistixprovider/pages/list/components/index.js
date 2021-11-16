/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/logistixprovider/pages/list/components/Header';

const LogistixProviderListContent = (props) => {
    const { getLogistixProviderList, data, loading, deleteLogistixProvider } = props;
    const logistixProviderList = (data && data.getLogistixProviderList && data.getLogistixProviderList.items) || [];
    const logistixProviderTotal = (data && data.getLogistixProviderList && data.getLogistixProviderList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID', sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'channel_shipping_method', headerName: 'Channel Shipping Method', sortable: true, hideable: true },
        { field: 'provider', headerName: 'Provider', sortable: true, hideable: true },
        { field: 'service', headerName: 'Service', hideable: true },
        { field: 'action', headerName: 'Action', hideable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id', type: 'like', label: 'ID', initialValue: '' },
        { field: 'channel_shipping_method', name: 'channel_shipping_method', type: 'like', label: 'Channel Shipping Method', initialValue: '' },
        { field: 'provider', name: 'provider', type: 'like', label: 'Provider', initialValue: '' },
        { field: 'service', name: 'service', type: 'like', label: 'Service', initialValue: '' },
    ];

    const rows = logistixProviderList.map((logistix) => ({
        ...logistix,
        action: () => (
            <Link href={`/configurations/logistixprovider/edit/${logistix.entity_id}`}>
                <a className="link-button">View</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getLogistixProviderList}
                loading={loading}
                columns={columns}
                count={logistixProviderTotal}
                deleteRows={deleteLogistixProvider}
                showCheckbox
            />
        </>
    );
};

export default LogistixProviderListContent;
