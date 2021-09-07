import Layout from '@layout';
import gqlService from '@modules/notification/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getNotificationList, { data, loading }] = gqlService.getNotificationList();
    const [multiReadNotification] = gqlService.multiReadNotification();

    const contentProps = {
        multiReadNotification,
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
