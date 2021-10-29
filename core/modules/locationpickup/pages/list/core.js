import Layout from '@layout';
import gqlService from '@modules/locationpickup/services/graphql';

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
