/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect, useRef, useState } from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/overridestock/pages/list/components/Header';

const OverrideStockListContent = (props) => {
    const { data, loading, getVirtualStockQuantityList, multideleteVirtualStockQuantity } = props;
    const virtualStockQuantityList = (data && data.getVirtualStockQuantityList && data.getVirtualStockQuantityList.items) || [];
    const virtualStockQuantityTotal = (data && data.getVirtualStockQuantityList && data.getVirtualStockQuantityList.total_count) || 0;
    const isDeleteAll = useRef(false);
    const [listId, setListId] = useState([]);

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

    const multidelete = (listIdVirtualStock) => {
        multideleteVirtualStockQuantity({
            variables: {
                id: listIdVirtualStock,
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success Delete All Override Stock',
                    variant: 'success',
                });
                isDeleteAll.current = false;
                getVirtualStockQuantityList({
                    variables: {
                        pageSize: 10,
                        currentPage: 1,
                    },
                });
            })
            .catch((e) => {
                window.backdropLoader(false);
                isDeleteAll.current = false;
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    useEffect(() => {
        if (virtualStockQuantityList.length > 0 && isDeleteAll.current) {
            const listIdFromGraphql = virtualStockQuantityList.map((virtualStockQuantity) => virtualStockQuantity.entity_id);
            const tempListId = [...listId, ...listIdFromGraphql.filter((id) => !listId.includes(id))];
            setListId([...tempListId]);

            if (virtualStockQuantityTotal > tempListId.length) {
                getVirtualStockQuantityList({
                    variables: {
                        pageSize: virtualStockQuantityTotal,
                        currentPage: 1,
                    },
                });
            } else {
                multidelete(tempListId);
            }
        }
    }, [virtualStockQuantityList]);

    const deleteAllStock = async () => {
        if (virtualStockQuantityTotal > 0) {
            const listIdFromGraphql = virtualStockQuantityList.map((virtualStockQuantity) => virtualStockQuantity.entity_id);
            const tempListId = [...listId, ...listIdFromGraphql.filter((id) => !listId.includes(id))];
            setListId([...tempListId]);

            if (virtualStockQuantityTotal > tempListId.length) {
                getVirtualStockQuantityList({
                    variables: {
                        pageSize: virtualStockQuantityTotal,
                        currentPage: 1,
                    },
                });
            } else {
                multidelete(tempListId);
            }
            isDeleteAll.current = true;
            window.backdropLoader(true);
        } else {
            window.toastMessage({
                open: true,
                text: 'Failed Delete All Override Stock',
                variant: 'error',
            });
        }
    };

    return (
        <>
            <Header deleteAllStock={deleteAllStock} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getVirtualStockQuantityList}
                loading={isDeleteAll.current || loading}
                columns={columns}
                count={virtualStockQuantityTotal}
                deleteRows={multideleteVirtualStockQuantity}
                showCheckbox
            />
        </>
    );
};

export default OverrideStockListContent;
