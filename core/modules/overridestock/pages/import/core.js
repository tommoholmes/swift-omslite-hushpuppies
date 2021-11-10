import React, { useEffect } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/overridestock/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const [uploadVirtualStockQuantity] = gqlService.uploadVirtualStockQuantity();
    const [downloadList, downloadListRes] = gqlService.downloadSampleCsv({ type: 'import_override_stock' });
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [showProgress, setshowProgress] = React.useState(false);
    const [getActivity] = gqlService.getActivity({
        variables: {
            code: 'import_vs_qty',
            by_session: true,
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
        downloadList();
    }, []);

    const urlDownload = downloadListRes && downloadListRes.data && downloadListRes.data.downloadSampleCsv;

    const handleSubmit = ({ binary }) => {
        const variables = {
            binary,
        };
        setshowProgress(false);
        window.backdropLoader(true);
        uploadVirtualStockQuantity({
            variables,
        })
            .then(() => {
                setActivityState({ ...activityState, loading: true });
                getActivity();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success Import Override Stock',
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
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode);
    };

    const contentProps = {
        formik,
        urlDownload,
        handleDropFile,
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
