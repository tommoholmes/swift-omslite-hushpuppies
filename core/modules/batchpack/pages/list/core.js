import Layout from '@layout';
import gqlService from '@modules/batchpack/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const pageConfig = {
        title: 'Pack by Batch List',
    };

    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();

    const contentProps = {
        getStoreShipmentList,
        data,
        loading,
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
