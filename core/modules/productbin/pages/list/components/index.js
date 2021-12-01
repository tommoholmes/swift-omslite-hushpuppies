/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import Table from '@common_table';
import Header from '@modules/productbin/pages/list/components/Header';
import Autocomplete from '@common_autocomplete';
import gqlServiceLoc from '@modules/location/services/graphql';

const ProductBinListContent = (props) => {
    const { data, loading, getProductBinList, massDeleteProductBin } = props;
    const productBinList = (data && data.getProductBinList && data.getProductBinList.items) || [];
    const productBinTotal = (data && data.getProductBinList && data.getProductBinList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID', hideable: true, sortable: true, initialSort: 'ASC' },
        { field: 'loc_name', headerName: 'Location', hideable: true, sortable: true },
        { field: 'sku', headerName: 'SKU', hideable: true, sortable: true },
        { field: 'bin_code', headerName: 'Code Bin', hideable: true, sortable: true },
        { field: 'sort_no', headerName: 'Sort Number', hideable: true, sortable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: 'ID To', initialValue: '' },
        {
            field: 'loc_name',
            name: 'loc_name',
            type: 'like',
            label: 'Location',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getLocationList, { data: dataLoc, loading: loadingLoc }] = gqlServiceLoc.getLocationList();
                const [optionsLoc, setOptionsLoc] = useState([]);
                const [searchLoc, setSearchLoc] = useState('');
                const primaryKey = 'loc_id';
                const labelKey = 'loc_name';

                useEffect(() => {
                    const onChangeTimeOut = setTimeout(() => {
                        const isExist = searchLoc && optionsLoc.filter((elm) => elm?.[labelKey]?.toLowerCase().includes(searchLoc?.toLowerCase()));
                        if (searchLoc && isExist.length === 0) {
                            getLocationList({
                                variables: {
                                    search: searchLoc,
                                    pageSize: 20,
                                    currentPage: 1,
                                },
                            });
                        }
                        return null;
                    }, 500);

                    return () => clearTimeout(onChangeTimeOut);
                }, [searchLoc]);

                useEffect(() => {
                    if (dataLoc && dataLoc.getLocationList && dataLoc.getLocationList.items) {
                        const ids = new Set(optionsLoc.map((d) => d[primaryKey]));
                        setOptionsLoc([...optionsLoc, ...dataLoc.getLocationList.items.filter((d) => !ids.has(d[primaryKey]))]);
                    }
                }, [dataLoc]);

                return (
                    <Autocomplete
                        mode={loadingLoc.length > 0 ? 'default' : 'lazy'}
                        loading={loadingLoc}
                        style={{ width: 228 }}
                        getOptions={getLocationList}
                        value={optionsLoc.find((e) => e[labelKey] === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue[labelKey]);
                        }}
                        onInputChange={(e) => setSearchLoc(e && e.target && e.target.value)}
                        options={optionsLoc}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        { field: 'sku', name: 'sku', type: 'like', label: 'SKU', initialValue: '' },
        { field: 'bin_code', name: 'bin_code', type: 'like', label: 'Code Bin', initialValue: '' },
        { field: 'sort_no', name: 'sort_no', type: 'like', label: 'Sort Number', initialValue: '' },
    ];

    const rows = productBinList.map((productBin) => ({
        ...productBin,
        id: productBin.entity_id,
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getProductBinList}
                loading={loading}
                columns={columns}
                count={productBinTotal}
                deleteRows={massDeleteProductBin}
                showCheckbox
            />
        </>
    );
};

export default ProductBinListContent;
