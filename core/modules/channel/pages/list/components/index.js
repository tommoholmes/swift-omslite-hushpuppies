/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import { optionsFramework, optionsRuleType } from '@modules/channel/helpers';
import Header from '@modules/channel/pages/list/components/Header';
import useStyles from '@modules/channel/pages/list/components/Header/style';

const ChannelListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getChannelList, multideleteChannel } = props;
    const channelList = (data && data.getChannelList && data.getChannelList.items) || [];
    const channelTotal = (data && data.getChannelList && data.getChannelList.total_count) || 0;

    const columns = [
        { field: 'channel_id', headerName: 'No', sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'channel_code', headerName: 'Channel Code', hideable: true },
        { field: 'channel_name', headerName: 'Channel Name', sortable: true, hideable: true },
        { field: 'channel_url', headerName: 'URL', hideable: true },
        { field: 'token', headerName: 'Token', hideable: true },
        { field: 'framework', headerName: 'Framework', hideable: true },
        { field: 'rule_type', headerName: 'Rule Type', hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        { field: 'channel_id', name: 'channel_id_from', type: 'from', label: 'No From', initialValue: '' },
        { field: 'channel_id', name: 'channel_id_to', type: 'to', label: 'No To', initialValue: '' },
        { field: 'channel_code', name: 'channel_code', type: 'like', label: 'Channel Code', initialValue: '' },
        { field: 'channel_url', name: 'channel_url', type: 'like', label: 'Channel Url', initialValue: '' },
        {
            field: 'framework',
            name: 'framework',
            type: 'in',
            label: 'Framework',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    style={{ width: 228 }}
                    multiple
                    value={(filterValue || []).map((option) => optionsFramework.find((e) => e.name === option))}
                    onChange={(newValue) => setFilterValue((newValue || []).map((option) => option && option.name))}
                    options={optionsFramework}
                />
            ),
        },
        {
            field: 'rule_type',
            name: 'rule_type',
            type: 'eq',
            label: 'Rule Type',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    style={{ width: 228 }}
                    value={optionsRuleType.find((e) => e.name === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.name)}
                    options={optionsRuleType}
                />
            ),
        },
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

    return (
        <>
            <Header />
            <Table
                filters={filters}
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
