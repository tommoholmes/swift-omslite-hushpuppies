import Layout from '@layout';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getNotificationList, { data, loading }] = gqlService.getNotificationList();

    const contentProps = {
        getNotificationList,
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
