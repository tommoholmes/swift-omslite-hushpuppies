/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/configuration/pages/list/components/Header';

const ConfigurationTadaListContent = (props) => {
    const { data, loading, getConfigurationTadaList, multideleteConfigurationTada } = props;
    const configurationTadaList = (data && data.getConfigurationTadaList && data.getConfigurationTadaList.items) || [];
    const configurationTadaTotal = (data && data.getConfigurationTadaList && data.getConfigurationTadaList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'channel_name', headerName: 'Sales Channel', hideable: true },
        { field: 'username', headerName: 'Username', hideable: true },
        { field: 'password', headerName: 'Password', hideable: true },
        { field: 'api_key', headerName: 'Api Key', hideable: true },
        { field: 'api_secret', headerName: 'Api Secret', hideable: true },
        { field: 'program_id', headerName: 'Program ID', hideable: true },
        { field: 'actions', headerName: 'Actions' },
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
