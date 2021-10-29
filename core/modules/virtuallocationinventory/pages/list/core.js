import Layout from '@layout';
import gqlService from '@modules/virtuallocationinventory/services/graphql';

const Core = (props) => {
    const { Content } = props;

    const [getVirtualLocationList, { data, loading }] = gqlService.getVirtualLocationList();
    const [deleteVirtualLocation] = gqlService.deleteVirtualLocation();

    const deleteMultipleRowsHandle = async ({ variables }) => {
        const deletesAction = variables.id.map((val) => {
            if (val) {
                return deleteVirtualLocation({
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
        getVirtualLocationList,
        data,
        loading,
        deleteMultipleRowsHandle,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
