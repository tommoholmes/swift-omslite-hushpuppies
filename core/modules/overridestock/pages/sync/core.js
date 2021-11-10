import Layout from '@layout';
import gqlService from '@modules/overridestock/services/graphql';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';

const Core = (props) => {
    const { Content } = props;
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [showProgress, setshowProgress] = React.useState(false);
    const [getActivity] = gqlService.getActivity({
        variables: {
            code: 'sync_vs_qty_to_cnx',
            by_session: false,
        },
        onCompleted: (res) => {
            setActivityState({ ...res.getActivity, loading: false });
            if (firstLoad) {
                setFirstLoad(false);
            }
            if (res.getActivity.run_status === 'running') {
                setTimeout(() => {
                    setActivityState({ ...res.getActivity, loading: true });
                    getActivity();
                }, 100);
            }
            if (!firstLoad && res.getActivity.run_status === 'finished') {
                setshowProgress(true);
            }
        },
        onError: () => {
            getActivity();
        },
    });

    useEffect(() => {
        getActivity();
    }, []);

    const [syncOverrideStockToMarketplace] = gqlService.syncOverrideStockToMarketplace();

    const formik = useFormik({
        initialValues: {
            channel_store_id: null,
        },
        validationSchema: Yup.object().shape({
            channel_store_id: Yup.object().typeError('Required!').required('Required!'),
        }),
        onSubmit: (values) => {
            setshowProgress(false);
            window.backdropLoader(true);
            syncOverrideStockToMarketplace({
                variables: {
                    store_id: values.channel_store_id.channel_store_id?.toString(),
                },
            })
                .then(() => {
                    setActivityState({ ...activityState, loading: true });
                    getActivity();
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: 'Success sync stock to mp',
                        variant: 'success',
                    });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        },
    });

    const contentProps = {
        formik,
        activityState,
        firstLoad,
        showProgress,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
