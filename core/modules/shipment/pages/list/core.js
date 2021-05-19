import Layout from '@layout';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getShipmentList, { data, loading }] = gqlService.getShipmentList();

    const contentProps = {
        getShipmentList,
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
