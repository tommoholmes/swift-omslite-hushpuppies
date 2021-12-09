import Layout from '@layout';
import gqlService from '@modules/requestvendor/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getVendorRequestList, { data, loading }] = gqlService.getVendorRequestList();

    const contentProps = {
        getVendorRequestList,
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
