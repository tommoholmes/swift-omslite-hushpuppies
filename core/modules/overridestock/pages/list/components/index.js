/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useRef, useState } from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/overridestock/pages/list/components/Header';
import gqlService from '@modules/overridestock/services/graphql';

const OverrideStockListContent = (props) => {
    const { data, loading, getVirtualStockQuantityList, multideleteVirtualStockQuantity, deleteAllVirtualStock } = props;
    const virtualStockQuantityList = (data && data.getVirtualStockQuantityList && data.getVirtualStockQuantityList.items) || [];
    const virtualStockQuantityTotal = (data && data.getVirtualStockQuantityList && data.getVirtualStockQuantityList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID', sortable: 'true', initialSort: 'ASC' },
        { field: 'vs_id', headerName: 'Virtual Stock', sortable: 'true' },
        { field: 'sku', headerName: 'SKU', sortable: 'true' },
        { field: 'qty', headerName: 'Quantity', sortable: 'true' },
        { field: 'reason', headerName: 'Reason', sortable: 'true' },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'qty', name: 'qty_from', type: 'from', label: 'Quantity From', initialValue: '' },
        { field: 'qty', name: 'qty_to', type: 'to', label: 'Quantity To', initialValue: '' },
        { field: 'vs_id', name: 'vs_id', type: 'like', label: 'Virtual Stock', initialValue: '' },
        { field: 'sku', name: 'sku', type: 'like', label: 'SKU', initialValue: '' },
        { field: 'reason', name: 'reason', type: 'like', label: 'Reason', initialValue: '' },
    ];

    const rows = virtualStockQuantityList.map((virtualStockQuantity) => ({
        ...virtualStockQuantity,
        id: virtualStockQuantity.entity_id,
        vs_id: virtualStockQuantity.vs_id.vs_name,
        actions: () => (
            <Link href={`/cataloginventory/overridestock/edit/${virtualStockQuantity.entity_id}`}>
                <a className="link-button">view</a>
            </Link>
        ),
    }));

    const handleDelete = async (dataVar) => {
        if (dataVar?.variables?.id?.length === 0) {
            await deleteAllVirtualStock();
            return;
        }
        await multideleteVirtualStockQuantity({ ...dataVar });
    };

    const [syncOverrideStockToMarketplace] = gqlService.syncOverrideStockToMarketplace();
    const [syncToMpClicked, setSyncToMpClicked] = useState(true);

    return (
        <>
            <Header syncToMpClicked={syncToMpClicked} setSyncToMpClicked={setSyncToMpClicked} />
            <Table
                deleteMessage="Are you sure want to delete all override stock?"
                filters={filters}
                rows={rows}
                getRows={getVirtualStockQuantityList}
                loading={loading}
                columns={columns}
                count={virtualStockQuantityTotal}
                deleteRows={handleDelete}
                showCheckbox
                allowActionZeroSelected
                allowAppendExistingActions
                actions={[
                    {
                        title: 'Sync Stock To Marketplace',
                        label: 'Sync Stock To Marketplace',
                        message: 'Are you sure want to sync stock to marketplace?',
                        confirmDialog: 'true',
                        onClick: async (_checkedRows) => {
                            const variables = { id: _checkedRows.map((checkedRow) => checkedRow?.id) };
                            try {
                                const res = await syncOverrideStockToMarketplace({ variables });
                                window.toastMessage({
                                    open: true,
                                    text: res?.data?.syncOverrideStockToMarketplace ?? 'success sync override stock to marketplace',
                                    variant: 'success',
                                });
                                setSyncToMpClicked(true);
                            } catch (error) {
                                window.toastMessage({
                                    open: true,
                                    text: error.message,
                                    variant: 'error',
                                });
                            }
                        },
                    },
                ]}
            />
        </>
    );
};

export default OverrideStockListContent;
