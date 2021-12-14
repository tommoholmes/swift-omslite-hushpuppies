import Layout from '@layout';
import gqlService from '@modules/irispayoutapproval/services/graphql';

const Core = (props) => {
    const { Content } = props;

    const [getVendorIrisPayoutApprovalList, { data, loading }] = gqlService.getVendorIrisPayoutApprovalList();
    const [vendorIrisPayoutApprove] = gqlService.vendorIrisPayoutApprove();
    const [vendorIrisPayoutReject] = gqlService.vendorIrisPayoutReject();

    const contentProps = {
        getVendorIrisPayoutApprovalList,
        vendorIrisPayoutApprove,
        vendorIrisPayoutReject,
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
