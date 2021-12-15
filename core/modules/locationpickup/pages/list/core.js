import Layout from '@layout';
import gqlService from '@modules/locationpickup/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const { Content } = props;

    const [getLocationPickupList, { data, loading }] = gqlService.getLocationPickupList();
    const [deleteLocationPickup] = gqlService.deleteLocationPickup();

    const deleteMultipleRowsHandle = async ({ variables }) => {
        const deletesAction = variables.id.map((val) => {
            if (val) {
                return deleteLocationPickup({
                    variables: {
                        id: val,
                    },
                });
            }
            return null;
        });

        try {
            await Promise.all(deletesAction);
        } catch (error) {
            window.toastMessage({
                open: true,
                text: error.message,
                variant: 'error',
            });
        }
    };

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_location_pickup',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getLocationPickupList,
        deleteMultipleRowsHandle,
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
