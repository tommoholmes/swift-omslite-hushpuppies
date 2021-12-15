import React, { useEffect } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/overridestock/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const { Content } = props;
    const [uploadVirtualStockQuantity] = gqlService.uploadVirtualStockQuantity();
    const [downloadList, downloadListRes] = gqlService.downloadSampleCsv({ type: 'import_override_stock' });
    const [finishedAfterSubmit, setFinishedAfterSubmit] = React.useState(false);
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [showProgress, setshowProgress] = React.useState(false);
    const intervalRef = React.useRef(null);
    const [getActivity] = gqlService.getActivity({
        variables: {
            code: 'import_vs_qty',
            by_session: true,
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
                setshowProgress(true);
                clearInterval(intervalRef.current);
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
        downloadList();
    }, []);

    const urlDownload = downloadListRes && downloadListRes.data && downloadListRes.data.downloadSampleCsv;

    const handleSubmit = ({ binary }) => {
        const variables = {
            binary,
        };

        setshowProgress(false);
        window.backdropLoader(true);
        setFinishedAfterSubmit(false);
        intervalRef.current = setInterval(() => {
            getActivity();
        }, 250);

        uploadVirtualStockQuantity({
            variables,
        })
            .then(() => {
                getActivity();
                setFinishedAfterSubmit(true);
                window.toastMessage({
                    open: true,
                    text: 'Success import override stock',
                    variant: 'success',
                });
            })
            .catch((e) => {
                window.backdropLoader(false);
                setFinishedAfterSubmit(true);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });

        setTimeout(() => {
            window.backdropLoader(false);
        }, 1000);
    };

    const formik = useFormik({
        initialValues: {
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        const idx = baseCode.indexOf('base64,');
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode.slice(idx + 7));
    };

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
        urlDownload,
        handleDropFile,
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
