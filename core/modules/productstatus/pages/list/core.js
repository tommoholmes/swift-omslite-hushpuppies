import Layout from '@layout';
import gqlService from '@modules/productstatus/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getMarketplaceProductStatusList, { data, loading }] = gqlService.getMarketplaceProductStatusList();

    const contentProps = {
        getMarketplaceProductStatusList,
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
