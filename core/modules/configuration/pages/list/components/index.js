/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import Header from '@modules/configuration/pages/list/components/Header';

const ConfigurationTadaListContent = (props) => {
    const { data, loading, getConfigurationTadaList, multideleteConfigurationTada } = props;
    const configurationTadaList = (data && data.getConfigurationTadaList && data.getConfigurationTadaList.items) || [];
    const configurationTadaTotal = (data && data.getConfigurationTadaList && data.getConfigurationTadaList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true, initialSort: 'ASC' },
        { field: 'channel_name', headerName: 'Sales Channel', sortable: true, hideable: true },
        { field: 'username', headerName: 'Username', sortable: true, hideable: true },
        { field: 'password', headerName: 'Password', sortable: true, hideable: true },
        { field: 'api_key', headerName: 'Api Key', sortable: true, hideable: true },
        { field: 'api_secret', headerName: 'Api Secret', sortable: true, hideable: true },
        { field: 'program_id', headerName: 'Program ID', sortable: true, hideable: true },
        { field: 'actions', headerName: 'Actions' },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'channel_name',
            name: 'channel_name',
            type: 'eq',
            label: 'Sales Channel',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getChannelList, getChannelListRes] = channelGqlService.getChannelList();
                const channelOptions = (getChannelListRes
                    && getChannelListRes.data
                    && getChannelListRes.data.getChannelList
                    && getChannelListRes.data.getChannelList.items) || [];
                const primaryKey = 'channel_name';
                const labelKey = 'channel_name';
                return (
                    <Autocomplete
                        mode="lazy"
                        style={{ width: 228 }}
                        getOptions={getChannelList}
                        value={channelOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={channelOptions}
                        getOptionsVariables={
                            {
                                variables: {
                                    pageSize: null,
                                    currentPage: 1,
                                },
                            }
                        }
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        { field: 'username', name: 'username', type: 'like', label: 'Username', initialValue: '' },
        { field: 'password', name: 'password', type: 'like', label: 'Password', initialValue: '' },
        { field: 'api_key', name: 'api_key', type: 'like', label: 'Api Key', initialValue: '' },
        { field: 'api_secret', name: 'api_secret', type: 'like', label: 'Api Secret', initialValue: '' },
        { field: 'program_id', name: 'program_id', type: 'like', label: 'Program Id', initialValue: '' },
    ];

    const rows = configurationTadaList.map((configurationTada) => ({
        ...configurationTada,
        id: configurationTada.id,
        actions: () => (
            <Link href={`/tada/configuration/edit/${configurationTada.id}`}>
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
                filters={filters}
                rows={rows}
                getRows={getConfigurationTadaList}
                deleteRows={multideleteConfigurationTada}
                loading={loading}
                columns={columns}
                count={configurationTadaTotal}
                showCheckbox
            />
        </>
    );
};

export default ConfigurationTadaListContent;
