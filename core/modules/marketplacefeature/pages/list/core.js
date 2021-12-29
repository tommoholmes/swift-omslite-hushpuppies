import Layout from '@layout';
import gqlService from '@modules/marketplacefeature/services/graphql';
import { useState } from 'react';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

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

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_marketplace_feature',
    });

    if (loading || aclCheckLoading) {
        return (
            <Layout>
                <div>loading.....</div>
            </Layout>
        );
    }
    if (!data) {
        window.toastMessage({
            open: true,
            text: 'Data not found!',
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/');
        }, 1000);
        return (
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    Data not found!
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
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
