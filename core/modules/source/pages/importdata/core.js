import React, { useEffect } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/source/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const [uploadSource] = gqlService.uploadSource();
    const [downloadList, downloadListRes] = gqlService.downloadSampleCsv({ type: 'source' });
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [showProgress, setshowProgress] = React.useState(false);
    const [getActivity] = gqlService.getActivity({
        onCompleted: (res) => {
            setActivityState(res.getActivity);
            if (firstLoad) {
                setFirstLoad(false);
            }
            if (res.getActivity.run_status === 'running') {
                setTimeout(() => {
                    getActivity();
                }, 100);
            }
        },
        onError: () => {
            getActivity();
        },
    });

    useEffect(() => {
        downloadList();
        getActivity();
    }, []);

    const urlDownload = downloadListRes && downloadListRes.data && downloadListRes.data.downloadSampleCsv;

    const handleSubmit = ({ binary }) => {
        const variables = {
            binary,
        };
        setTimeout(() => {
            getActivity();
            setshowProgress(true);
        }, 1000);
        uploadSource({
            variables,
        })
            .then(() => {
                getActivity();
                setshowProgress(true);
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success Export Source',
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
