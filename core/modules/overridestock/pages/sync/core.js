import Layout from '@layout';
import gqlService from '@modules/overridestock/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';

const Core = (props) => {
    const { Content } = props;
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const intervalRef = React.useRef(null);
    const [finishedAfterSubmit, setFinishedAfterSubmit] = React.useState(false);
    const [showProgress, setshowProgress] = React.useState(false);
    const [getActivity] = gqlService.getActivity({
        variables: {
            code: 'sync_vs_qty_to_cnx',
            by_session: false,
        },
        onCompleted: (res) => {
            setActivityState(res.getActivity);
            if (firstLoad) {
                setFirstLoad(false);
            }
            if (res.getActivity.run_status === 'running') {
                clearInterval(intervalRef.current);
                setshowProgress(true);
                setTimeout(() => {
                    getActivity();
                }, 500);
            }

            if (res.getActivity.run_status === 'finished' && finishedAfterSubmit) {
                clearInterval(intervalRef.current);
                setshowProgress(true);
            }
            if ((res.getActivity.run_status !== 'running' || res.getActivity.run_status !== 'finished') && finishedAfterSubmit) {
                clearInterval(intervalRef.current);
                setshowProgress(true);
            }
        },
        onError: () => {
            clearInterval(intervalRef.current);
            setActivityState({ ...activityState });
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
            setFinishedAfterSubmit(false);
            intervalRef.current = setInterval(() => {
                getActivity();
            }, 250);

            syncOverrideStockToMarketplace({
                variables: {
                    store_id: Number(values.channel_store_id.channel_store_id),
                },
            })
                .then(() => {
                    getActivity();
                    setFinishedAfterSubmit(true);
                    window.toastMessage({
                        open: true,
                        text: 'Success sync stock to mp',
                        variant: 'success',
                    });
                })
                .catch((err) => {
                    setFinishedAfterSubmit(true);
                    clearInterval(intervalRef.current);
                    window.toastMessage({
                        open: true,
                        text: err.message,
                        variant: 'error',
                    });
                });

            setTimeout(() => {
                window.backdropLoader(false);
            }, 500);
        },
    });

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_override_stock',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        formik,
        activityState,
        firstLoad,
        showProgress,
        finishedAfterSubmit,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
