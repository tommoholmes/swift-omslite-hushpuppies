import Layout from '@layout';
import gqlService from '@modules/virtuallocationinventory/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getVirtualLocationList, { data, loading }] = gqlService.getVirtualLocationList();

    const contentProps = {
        getVirtualLocationList,
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
