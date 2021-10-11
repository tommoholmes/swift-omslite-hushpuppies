import Layout from '@layout';
import gqlService from '@modules/wavecreate/services/graphql';
import Router from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const { data, loading } = gqlService.getSummaryShipmentToPick();
    const [createPickByWave] = gqlService.createPickByWave();

    const autoGenerate = () => {
        window.backdropLoader(true);
        createPickByWave({
            variables: {
                is_auto: true,
            },
        })
            .then(async (res) => {
                window.backdropLoader(false);
                if (res.data.createPickByWave.pick_by_wave?.entitiy_id) {
                    window.toastMessage({
                        open: true,
                        text: 'Success auto generate!',
                        variant: 'success',
                    });
                    setTimeout(() => Router.push(`/pickpack/wavelist/picklist/${res.data.createPickByWave.pick_by_wave.entitiy_id}`), 250);
                }
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const contentProps = {
        data,
        loading,
        autoGenerate,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
