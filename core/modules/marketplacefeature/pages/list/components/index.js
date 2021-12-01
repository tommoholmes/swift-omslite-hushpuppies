/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import Table from '@common_table';
import Header from '@modules/marketplacefeature/pages/list/components/Header';
import Button from '@common_button';

const MarketplaceListContent = (props) => {
    const { data, addFeatures, setSelectedFeature } = props;
    const marketplaceFeatureList = data.getMarketplaceFeatureList;

    const [checkedState, setCheckedState] = useState(
        marketplaceFeatureList.map((feature) => feature.value.length !== 0 && feature.value !== 'false'),
    );

    const columns = [
        { field: 'label', headerName: 'Marketplace Feature' },
        { field: 'code', headerName: 'Marketplace Feature Code' },
        { field: 'action', headerName: 'Action' },
    ];

    const handleChecked = (idx) => {
        const updatedCheckedState = checkedState.map((item, index) => (index === idx ? !item : item));
        setCheckedState(updatedCheckedState);

        const selectedFeatures = marketplaceFeatureList
            .filter((feature, idxList) => updatedCheckedState[idxList] && !feature?.is_default_disabled)
            .map((feature) => feature.name);
        setSelectedFeature(selectedFeatures);
    };

    const rows = marketplaceFeatureList.map((feature, idx) => ({
        ...feature,
        action: (
            <input
                type="checkbox"
                id={`feature-${idx}`}
                name={idx}
                value={idx}
                checked={checkedState?.[idx]}
                disabled={feature?.is_default_disabled}
                onChange={() => handleChecked(idx)}
            />
        ),
    }));

    return (
        <>
            <Header />
            <Table rows={rows} count={rows.length} getRows={() => {}} columns={columns} hideActions hideFilters hideColumns hideFooter />
            <Button style={{ margin: '20px 0px' }} onClick={() => addFeatures()}>
                Add Features
            </Button>
        </>
    );
};

export default MarketplaceListContent;
