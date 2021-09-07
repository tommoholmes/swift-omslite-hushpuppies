import Layout from '@layout';
import gqlService from '@modules/managerma/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getRmaList, { data, loading }] = gqlService.getRmaList();

    const contentProps = {
        getRmaList,
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
