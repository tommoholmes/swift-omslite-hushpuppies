import React, { useEffect, useState } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/source/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const [updateSource] = gqlService.updateSource();
    const [downloadList] = gqlService.downloadSampleCsv();
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [showProgress, setshowProgress] = React.useState(false);
    const [getActivity] = gqlService.getActivity({
        variables: {
            code: 'update_source',
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

    const [urlDownload, setUrlDownload] = useState([]);

    useEffect(async () => {
        getActivity();
        try {
            const [resSource, resSourceSaleable] = await Promise.all([
                downloadList({ variables: { type: 'source' } }),
                downloadList({ variables: { type: 'source_upload_saleable' } }),
            ]);

            setUrlDownload([resSource.data.downloadSampleCsv, resSourceSaleable.data.downloadSampleCsv]);
            // eslint-disable-next-line no-empty
        } catch (error) {}
    }, []);

    // useEffect(() => {
    //     if (downloadListRes && downloadListRes.data && downloadListRes.data.downloadSampleCsv) {
    //         setUrlDownload(downloadListRes.data.downloadSampleCsv);
    //     }
    // }, [downloadListRes.data]);

    const handleSubmit = ({ binary }) => {
        setshowProgress(false);
        const variables = {
            binary,
        };
        window.backdropLoader(true);
        updateSource({
            variables,
        })
            .then(() => {
                setActivityState({ ...activityState, loading: true });
                getActivity();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success Update Source',
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
