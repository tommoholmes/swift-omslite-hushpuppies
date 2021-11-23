import Layout from '@layout';
import gqlService from '@modules/adminstore/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getAdminStoreList, { data, loading }] = gqlService.getAdminStoreList();
    const { loading: loadingGroup, data: dataGroup } = gqlService.getCustomerGroupOptions();

    if (loadingGroup) {
        return (
            <Layout>Loading...</Layout>
        );
    }

    const contentProps = {
        getAdminStoreList,
        data,
        loading,
        groupOptions: dataGroup?.getCustomerGroupOptions,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
