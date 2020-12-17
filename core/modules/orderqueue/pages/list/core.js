import Layout from '@layout';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getOrderQueueList, { data, loading }] = gqlService.getOrderQueueList();
    // const [multideleteChannel] = gqlService.multideleteChannel();

    const contentProps = {
        getOrderQueueList,
        // multideleteChannel,
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
