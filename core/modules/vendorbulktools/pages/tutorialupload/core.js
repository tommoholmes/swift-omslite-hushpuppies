import Layout from '@layout';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const { Content } = props;

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_bulk_tools',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const pageConfig = {
        title: 'Tutorial Upload Product',
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content />
        </Layout>
    );
};

export default Core;
