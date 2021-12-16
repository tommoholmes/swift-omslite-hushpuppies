import React, { useEffect, useRef, useState } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/vendorbulktools/services/graphql';
import { bulkToolsOptions } from '@modules/vendorbulktools/helpers';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const ContentWrapper = (props) => {
    const { Content, bulkToolsOptionsState } = props;
    const [vendorProductUpload] = gqlService.vendorProductUpload();
    const [vendorCategoryUpload] = gqlService.vendorCategoryUpload();
    const [bulkType, setBulkType] = useState(bulkToolsOptionsState.length > 0 ? bulkToolsOptionsState[0] : null);

    const [urlDownload, setUrlDownload] = useState('');
    const [downloadSampleCsv] = gqlService.downloadSampleCsv();

    const [errorHtml, setErrorHtml] = React.useState('');
    const [finishedAfterSubmit, setFinishedAfterSubmit] = React.useState(false);
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [showProgress, setshowProgress] = React.useState(false);
    const intervalRef = React.useRef(null);

    const [getActivity] = gqlService.getActivity({
        variables: {
            code: bulkType?.activity ?? '',
        },
        onCompleted: (res) => {
            setActivityState(res.getActivity);
            if (firstLoad) {
                setFirstLoad(false);
            }
            if (res.getActivity?.run_status === 'running') {
                clearInterval(intervalRef.current);
                setshowProgress(true);
                setTimeout(() => {
                    getActivity();
                }, 500);
            }

            if (res.getActivity?.run_status === 'finished' && finishedAfterSubmit) {
                setshowProgress(true);
                clearInterval(intervalRef.current);
            }

            if ((res.getActivity?.run_status !== 'running' || res.getActivity?.run_status !== 'finished') && finishedAfterSubmit) {
                clearInterval(intervalRef.current);
                setshowProgress(true);
            }
        },
        onError: () => {
            clearInterval(intervalRef.current);

            if (bulkType?.activity !== null) {
                setActivityState({ ...activityState });
                getActivity();
            }
        },
    });

    const [selectedChannel, setSelectedChannel] = useState(null);
    const isCategoryUpload = bulkType?.sample === 'vendor_category';
    const isProductUpload = bulkType?.sample === 'vendor_product';

    const handleSubmit = async ({ binary }) => {
        const variables = {
            binary,
        };

        setshowProgress(false);
        window.backdropLoader(true);
        setFinishedAfterSubmit(false);
        intervalRef.current = setInterval(() => {
            getActivity();
        }, 250);

        try {
            if (isProductUpload) {
                await vendorProductUpload({
                    variables,
                });
            } else if (isCategoryUpload) {
                await vendorCategoryUpload({
                    variables: {
                        ...variables,
                        channelCode: selectedChannel?.channel_code ?? null,
                    },
                });
            }
            getActivity();
            setFinishedAfterSubmit(true);
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: `${bulkType?.name} Success`,
                variant: 'success',
            });
        } catch (e) {
            getActivity();
            setFinishedAfterSubmit(true);
            window.backdropLoader(false);
            const regex = /(<([^>]+)>)/gi;
            if (regex.test(e.message)) {
                setErrorHtml(e.message);
                window.toastMessage({
                    open: true,
                    text: 'Error',
                    variant: 'error',
                });
            } else {
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            }
        }

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
            setErrorHtml('');
            handleSubmit(values);
        },
    });

    useEffect(async () => {
        if (bulkType?.sample) {
            try {
                const variables = {
                    type: bulkType?.sample,
                };
                const res = await downloadSampleCsv({
                    variables,
                });
                setUrlDownload(res && res.data && res.data.downloadSampleCsv);
                // eslint-disable-next-line no-empty
            } catch (error) {}
        }
    }, [bulkType]);

    const handleDropFile = (files) => {
        setErrorHtml('');
        const fileName = files[0].file.name;
        const { baseCode } = files[0];

        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode);
    };

    const contentProps = {
        formik,
        urlDownload,
        handleDropFile,
        errorHtml,
        bulkToolsOptionsState,
        setBulkType,
        bulkType,
        activityState,
        firstLoad,
        showProgress,
        finishedAfterSubmit,
        selectedChannel,
        setSelectedChannel,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

const Core = (props) => {
    const [isAccessAllowedLazy, { data, loading }] = gqlService.isAccessAllowedLazy();
    const [bulkToolsOptionsState, setBulkToolsOptionsState] = useState([]);
    const indexRef = useRef(0);

    useEffect(() => {
        if (indexRef.current < bulkToolsOptions.length) {
            isAccessAllowedLazy({
                variables: {
                    acl_code: bulkToolsOptions[indexRef.current]?.acl ?? '',
                },
            });
        }
    }, [indexRef.current]);

    useEffect(() => {
        if (data && data.isAccessAllowed && bulkToolsOptions[indexRef.current]) {
            setBulkToolsOptionsState([...bulkToolsOptionsState, bulkToolsOptions[indexRef.current]]);
            indexRef.current += 1;
        }
    }, [data, loading]);

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_bulk_tools',
    });

    if (loading || aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <>
            <ContentWrapper bulkToolsOptionsState={bulkToolsOptionsState} {...props} />
        </>
    );
};

export default Core;
