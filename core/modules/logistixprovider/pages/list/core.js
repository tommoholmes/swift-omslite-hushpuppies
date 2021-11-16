import Layout from '@layout';
import gqlService from '@modules/logistixprovider/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const [getLogistixProviderList, { data, loading }] = gqlService.getLogistixProviderList();
    const [deleteLogistixProvider] = gqlService.deleteLogistixProvider();

    const contentProps = {
        getLogistixProviderList,
        data,
        loading,
        deleteLogistixProvider,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
