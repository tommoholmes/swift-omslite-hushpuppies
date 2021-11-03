/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/source/pages/list/components/Header';
import useStyles from '@modules/source/pages/list/components/style';

const SourceListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getSourceList } = props;
    const sourceList = (data && data.getSourceList && data.getSourceList.items) || [];
    const sourceTotal = (data && data.getSourceList && data.getSourceList.total_count) || 0;

    const columns = [
        { field: 'source_id', headerName: 'ID', sortable: true, hideable: true },
        { field: 'loc_name', headerName: 'Location', sortable: true, hideable: true },
        { field: 'sku', headerName: 'SKU', sortable: true, hideable: true },
        { field: 'qty_total', headerName: 'Qty Total', hideable: true },
        { field: 'qty_reserved', headerName: 'Qty Reserved', hideable: true },
        { field: 'qty_incoming', headerName: 'Qty Incoming', hideable: true },
        { field: 'qty_saleable', headerName: 'Qty Saleable', hideable: true },
        { field: 'qty_buffer', headerName: 'Qty Buffer', hideable: true },
        { field: 'priority', headerName: 'Priority', hideable: true },
    ];

    const filters = [
        { field: 'source_id', name: 'source_id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'source_id', name: 'source_id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'qty_total', name: 'qty_total_from', type: 'from', label: 'Qty Total From', initialValue: '' },
        { field: 'qty_total', name: 'qty_total_to', type: 'to', label: 'Qty Total To', initialValue: '' },
        { field: 'qty_reserved', name: 'qty_reserved_from', type: 'from', label: 'Qty Reserved From', initialValue: '' },
        { field: 'qty_reserved', name: 'qty_reserved_to', type: 'to', label: 'Qty Reserved To', initialValue: '' },
        { field: 'qty_incoming', name: 'qty_incoming_from', type: 'from', label: 'Qty Incoming From', initialValue: '' },
        { field: 'qty_incoming', name: 'qty_incoming_to', type: 'to', label: 'Qty Incoming To', initialValue: '' },
        { field: 'qty_saleable', name: 'qty_saleable_from', type: 'from', label: 'Qty Saleable From', initialValue: '' },
        { field: 'qty_saleable', name: 'qty_saleable_to', type: 'to', label: 'Qty Saleable To', initialValue: '' },
        { field: 'qty_buffer', name: 'qty_buffer_from', type: 'from', label: 'Qty Buffer From', initialValue: '' },
        { field: 'qty_buffer', name: 'qty_buffer_to', type: 'to', label: 'Qty Buffer To', initialValue: '' },
        { field: 'priority', name: 'priority_from', type: 'from', label: 'Priority From', initialValue: '' },
        { field: 'priority', name: 'priority_to', type: 'to', label: 'Priority To', initialValue: '' },
        { field: 'sku', name: 'sku', type: 'like', label: 'SKU', initialValue: '' },
        { field: 'loc_name', name: 'loc_name', type: 'like', label: 'Location', initialValue: '' },
    ];

    const rows = sourceList.map((source) => ({
        ...source,
        id: source.source_id,
    }));

    return (
        <>
            <Header />
            <Table filters={filters} rows={rows} getRows={getSourceList} loading={loading} columns={columns} count={sourceTotal} hideActions />
        </>
    );
};

export default SourceListContent;
