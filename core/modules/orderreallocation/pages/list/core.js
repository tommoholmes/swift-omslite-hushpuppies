import Layout from '@layout';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getOrderReallocationList, { data, loading }] = gqlService.getOrderReallocationList();

    const contentProps = {
        getOrderReallocationList,
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
