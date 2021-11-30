import Layout from '@layout';
import gqlService from '@modules/productattributemapping/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();

    const [getMarketplaceProductAttributeMappingList, { data, loading }] = gqlService.getMarketplaceProductAttributeMappingList();
    const [deleteMarketplaceProductAttributeMapping] = gqlService.deleteMarketplaceProductAttributeMapping();
    const [downloadMarketplaceProductAttribute] = gqlService.downloadMarketplaceProductAttribute();

    const handleExport = () => {
        window.backdropLoader(true);
        downloadMarketplaceProductAttribute().then((res) => {
            window.backdropLoader(false);
            setTimeout(() => router.push(res.data.downloadMarketplaceProductAttribute), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const contentProps = {
        getMarketplaceProductAttributeMappingList,
        deleteMarketplaceProductAttributeMapping,
        handleExport,
        data,
        loading,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
