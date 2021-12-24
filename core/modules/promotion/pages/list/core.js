import Layout from '@layout';
import gqlService from '@modules/promotion/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();

    const [getPromotionList, { data, loading }] = gqlService.getPromotionList();
    const [updateStatusPromotion] = gqlService.updateStatusPromotion();
    const [massDeletePromotion] = gqlService.massDeletePromotion();
    const [exportPromotion] = gqlService.exportPromotion({
        onCompleted: (res) => {
            window.backdropLoader(false);
            router.push(res.exportPromotion);
            window.toastMessage({
                open: true,
                text: 'Success export Shipments',
                variant: 'success',
            });
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'promotion',
    });

    const { loading: aclCheckCreateLoading, data: aclCheckCreateData } = aclService.isAccessAllowed({
        acl_code: 'promotion_create',
    });

    const { loading: aclCheckEditLoading, data: aclCheckEditData } = aclService.isAccessAllowed({
        acl_code: 'promotion_modify',
    });

    if (aclCheckLoading || aclCheckCreateLoading || aclCheckEditLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getPromotionList,
        data,
        loading,
        updateStatusPromotion,
        massDeletePromotion,
        exportPromotion,
        canCreate: aclCheckCreateData?.isAccessAllowed,
        canEdit: aclCheckEditData?.isAccessAllowed,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
