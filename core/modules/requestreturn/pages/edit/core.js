/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import gqlService from '@modules/requestreturn/services/graphql';

const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const Message = dynamic(() => import('@common_toast'), { ssr: false });

const ContentWrapper = (props) => {
    const { data, Content } = props;
    const router = useRouter();
    const [backdropLoader, setBackdropLoader] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState({
        open: false,
        variant: '',
        text: '',
    });
    const handleCloseMessage = () => {
        setToastMessage({ ...toastMessage, open: false });
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.backdropLoader = setBackdropLoader;
            window.toastMessage = setToastMessage;
        }
    }, []);

    const requestreturn = data.getRequestReturnById;
    const [saveRequestReturn] = gqlService.saveRequestReturn();
    const [sendPackage] = gqlService.sendPackage();

    const handleSubmit = ({
        id,
        item_id,
        message,
        binary,
        filename,
    }) => {
        const variables = {
            id,
            item_id,
            message,
            binary_data: binary,
            filename,
        };
        window.backdropLoader(true);
        saveRequestReturn({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success Update Request!',
                variant: 'success',
            });
            setTimeout(window.location.reload(), 250);
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

    const handleSendPackage = () => {
        const variables = {
            id: requestreturn.id,
        };
        window.backdropLoader(true);
        sendPackage({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Order was packaged',
                variant: 'success',
            });
            setTimeout(window.location.reload(), 250);
        }).catch((e) => {
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
            id: requestreturn.id,
            item_id: requestreturn.items[0].id,
            message: '',
            binary_data: '',
            filename: '',
        },
        validationSchema: Yup.object().shape({
            message: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const detailReturn = {
        incrementId: requestreturn.increment_id,
        status: requestreturn.status_label,
        type: requestreturn.return_type,
        order: requestreturn.channel_order_increment_id,
        shipping: requestreturn.shipping_address,
        items: requestreturn.items,
        message: requestreturn.message,
    };

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        const idx = baseCode.indexOf('base64,');
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode.slice(idx + 7));
    };

    const formikSendPackage = useFormik({
        initialValues: {
            id: requestreturn.id,
        },
        onSubmit: (values) => {
            handleSendPackage(values);
        },
    });

    const contentProps = {
        formik,
        detailReturn,
        handleDropFile,
        formikSendPackage,
    };

    return (
        <>
            <Loading open={backdropLoader} />
            <Content {...contentProps} />
            <Message
                open={toastMessage.open}
                variant={toastMessage.variant}
                setOpen={handleCloseMessage}
                message={toastMessage.text}
            />
        </>
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getRequestReturnById({
        id: router && router.query && Number(router.query.id),
    });

    if (loading) {
        return <span>Loading...</span>;
    }

    if (!data) {
        return <span>Data not found!</span>;
    }

    return (
        <ContentWrapper data={data} {...props} />
    );
};

export default Core;
