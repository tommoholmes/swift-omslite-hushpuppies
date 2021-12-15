import Layout from '@layout';
import gqlService from '@modules/irispayoutapproval/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const { Content } = props;

    const [getVendorIrisPayoutApprovalList, { data, loading }] = gqlService.getVendorIrisPayoutApprovalList();
    const [vendorIrisPayoutApprove] = gqlService.vendorIrisPayoutApprove();
    const [vendorIrisPayoutReject] = gqlService.vendorIrisPayoutReject();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_vendor_iris',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

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
