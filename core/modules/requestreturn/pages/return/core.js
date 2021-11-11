/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
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
    const queryEmail = router.query.email;
    const queryOrder = router.query.order_number;
    const queryChannel = router.query.channel_code;

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

    const requestreturn = data.getShipmentItemToReturn;

    const handleSubmit = ({
        channel_order_increment_id,
        channel_code,
        customer_email,
        return_type,
        message,
        shipment_id,
        shipment_item_id,
        qty,
        reason,
        package_condition,
        binary,
        filename,
    }) => {
        const variables = {
            channel_order_increment_id,
            channel_code,
            customer_email,
            return_type: return_type.code,
            message,
            shipment_id,
            shipment_item_id,
            qty,
            reason: reason.code,
            package_condition: package_condition.code,
            binary_data: binary,
            filename,
        };
        console.log(variables);
        // window.backdropLoader(true);
        // updateChannel({
        //     variables,
        // }).then(() => {
        //     window.backdropLoader(false);
        //     window.toastMessage({
        //         open: true,
        //         text: 'Success edit channel!',
        //         variant: 'success',
        //     });
        //     setTimeout(() => router.push('/oms/channel'), 250);
        // })
        // .catch((e) => {
        //     window.backdropLoader(false);
        //     window.toastMessage({
        //         open: true,
        //         text: e.message,
        //         variant: 'error',
        //     });
        // });
    };

    const formik = useFormik({
        initialValues: {
            channel_order_increment_id: queryOrder,
            channel_code: queryChannel,
            customer_email: queryEmail,
            return_type: '',
            message: '',
            shipment_id: '',
            shipment_item_id: '',
            qty: '',
            reason: '',
            package_condition: '',
            binary: '',
            filename: '',
        },
        validationSchema: Yup.object().shape({
            return_type: Yup.string().required('Required!'),
            package_condition: Yup.string().required('Required!'),
            reason: Yup.string().required('Required!'),
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

    const contentProps = {
        queryOrder,
        formik,
        requestreturn,
        handleDropFile,
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
    const { email, order_number, channel_code } = router.query;
    const [searchShipmentToReturn, searchShipmentToReturnRes] = gqlService.searchShipmentToReturn();
    React.useEffect(() => {
        searchShipmentToReturn({
            variables: {
                customer_email: email,
                channel_order_increment_id: order_number,
                channel_code,
            },
        });
    }, []);
    const tampId = searchShipmentToReturnRes.data?.searchShipmentToReturn[0].entity_id;

    const { loading, data } = gqlService.getShipmentItemToReturn({
        shipment_id: tampId,
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
