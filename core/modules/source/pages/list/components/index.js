/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from './Header';
import useStyles from './style';

const SourceListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getSourceList } = props;
    const sourceList = (data && data.getSourceList && data.getSourceList.items) || [];
    const sourceTotal = (data && data.getSourceList && data.getSourceList.total_count) || 0;

    const columns = [
        { field: 'source_id', headerName: 'ID' },
        { field: 'loc_name', headerName: 'Location' },
        { field: 'sku', headerName: 'SKU' },
        { field: 'qty_total', headerName: 'Qty Total' },
        { field: 'qty_reserved', headerName: 'Qty Reserved' },
        { field: 'qty_incoming', headerName: 'Qty Incoming' },
        { field: 'qty_saleable', headerName: 'Qty Saleable' },
        { field: 'qty_buffer', headerName: 'Qty Buffer' },
        { field: 'priority', headerName: 'Priority' },
    ];

    const rows = sourceList.map((source) => ({
        ...source,
        id: source.source_id,
    }));

    // if (!data || loading) {
    //     return (
    //         <div>Loading . . .</div>
    //     );
    // }

    return (
        <>
            <Header />
            <Table
                rows={rows}
                getRows={getSourceList}
                loading={loading}
                columns={columns}
                count={sourceTotal}
            />
        </>
    );
};

export default SourceListContent;
