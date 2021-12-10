import Layout from '@layout';
import gqlService from '@modules/marketplacefeature/services/graphql';
import { useState } from 'react';

const Core = (props) => {
    const { Content } = props;

    const { data, loading, refetch } = gqlService.getMarketplaceFeatureList();
    const [addMarketplaceFeature] = gqlService.addMarketplaceFeature();
    const [selectedFeature, setSelectedFeature] = useState([]);

    const addFeatures = () => {
        window.backdropLoader(true);
        addMarketplaceFeature({
            variables: {
                features: selectedFeature,
            },
        })
            .then(() => {
                window.backdropLoader(false);
                refetch();
                window.toastMessage({
                    open: true,
                    text: 'Success Add Features',
                    variant: 'success',
                });
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    if (loading) {
        return (
            <Layout>
                <div>loading.....</div>
            </Layout>
        );
    }
    if (!data) {
        return (
            <Layout>
                <div>not found</div>
            </Layout>
        );
    }

    const contentProps = {
        data,
        addFeatures,
        setSelectedFeature,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
