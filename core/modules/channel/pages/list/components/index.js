/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from './Header';
import useStyles from './style';

const ChannelListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getChannelList, multideleteChannel } = props;
    const channelList = (data && data.getChannelList && data.getChannelList.items) || [];
    const channelTotal = (data && data.getChannelList && data.getChannelList.total_count) || 0;

    const columns = [
        { field: 'channel_id', headerName: 'No' },
        { field: 'channel_code', headerName: 'Channel Code' },
        { field: 'channel_name', headerName: 'Channel Name' },
        { field: 'channel_url', headerName: 'URL' },
        { field: 'token', headerName: 'Token' },
        { field: 'framework', headerName: 'Framework' },
        { field: 'rule_type', headerName: 'Rule Type' },
        { field: 'actions', headerName: 'Actions' },
    ];

    const rows = channelList.map((channel) => ({
        ...channel,
        id: channel.channel_id,
        actions: () => (
            <Link href={`/oms/channel/edit/${channel.channel_id}`}>
                <a className="link-button">view</a>
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
                getRows={getChannelList}
                deleteRows={multideleteChannel}
                loading={loading}
                columns={columns}
                count={channelTotal}
                showCheckbox
            />
        </>
    );
};

export default ChannelListContent;
