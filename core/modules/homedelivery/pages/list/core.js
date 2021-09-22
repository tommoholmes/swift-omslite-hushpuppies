import Layout from '@layout';
import gqlService from '@modules/homedelivery/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
    const [exportStoreShipmentToCsv, { datax, loadingx }] = gqlService.exportStoreShipmentToCsv();

    const contentProps = {
        getStoreShipmentList,
        data,
        loading,
        exportStoreShipmentToCsv,
        datax,
        loadingx,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
