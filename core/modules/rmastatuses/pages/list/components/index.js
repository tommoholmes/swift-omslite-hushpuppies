/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from './Header';

const RmaStatusesListContent = (props) => {
    const { data, loading, getRmaStatusList } = props;
    const rmaStatusesList = (data && data.getRmaStatusList && data.getRmaStatusList.items) || [];
    const rmaStatusesTotal = (data && data.getRmaStatusList && data.getRmaStatusList.total_count) || 0;

    const columns = [
        { field: 'status_code', headerName: 'Code', hideable: true },
        { field: 'status_label', headerName: 'Title', hideable: true },
        { field: 'position', headerName: 'Position', hideable: true },
        { field: 'actions', headerName: 'Actions' },
    ];

    const rows = rmaStatusesList.map((rmaStatuses) => ({
        ...rmaStatuses,
        id: rmaStatuses.status_code,
        actions: () => (
            <Link href={`/sales/rmastatuses/edit/${rmaStatuses.status_code}`}>
                <a className="link-button">View</a>
            </Link>
        ),
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
                getRows={getRmaStatusList}
                loading={loading}
                columns={columns}
                count={rmaStatusesTotal}
            />
        </>
    );
};

export default RmaStatusesListContent;
