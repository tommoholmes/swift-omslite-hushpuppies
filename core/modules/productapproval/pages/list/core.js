import Layout from '@layout';
import gqlService from '@modules/productapproval/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getVendorProductApprovalList, { data, loading }] = gqlService.getVendorProductApprovalList();
    const [productsApprove] = gqlService.productsApprove();

    const contentProps = {
        getVendorProductApprovalList,
        productsApprove,
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
