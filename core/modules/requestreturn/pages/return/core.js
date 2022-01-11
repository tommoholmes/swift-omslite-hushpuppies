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
    const [saveRequestReturnSubmit] = gqlService.saveRequestReturnSubmit();

    const [checkedState, setCheckedState] = useState(
        new Array(requestreturn.length).fill(false),
    );

    const handleSubmit = ({
        channel_order_increment_id,
        channel_code,
        customer_email,
        return_type,
        replacement_order_type,
        message,
        items,
    }) => {
        const input = {
            channel_order_increment_id,
            channel_code,
            customer_email,
            return_type,
            message,
            items: items.map((e) => (
                {
                    shipment_id: e.shipment_id,
                    shipment_item_id: e.shipment_item_id,
                    qty: Number(e.qty),
                    package_condition: e.package_condition,
                    reason: e.reason,
                    attachment: {
                        binary_data: e.attachment.binary_data || '',
                        filename: e.attachment.filename || '',
                    },
                }
            )),
        };
        if (return_type === 'replacement') {
            input.replacement_order_type = replacement_order_type;
        }
        window.backdropLoader(true);
        saveRequestReturnSubmit({
            variables: { input },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success Return Order!',
                variant: 'success',
            });
            setTimeout(() => router.push(router.asPath.replace('return/return?', 'request/request?')), 250);
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
            channel_order_increment_id: queryOrder,
            channel_code: queryChannel,
            customer_email: queryEmail,
            return_type: '',
            replacement_order_type: '',
            message: '',
            items: requestreturn.map((e) => (
                {
                    checked: false,
                    shipment_id: e.shipment_id,
                    shipment_item_id: e.entity_id,
                    qty: e.qty,
                    package_condition: '',
                    reason: '',
                    attachment: {
                        binary_data: e.binary,
                        filename: e.filename,
                    },
                }
            )),
        },
        validationSchema: Yup.object().shape({
            return_type: Yup.string().required('Required!'),
            replacement_order_type: Yup.string().when('return_type', {
                is: 'replacement',
                then: Yup.string().required('Required!'),
            }),
            items: Yup.array().of(
                Yup.object().shape({
                    checked: Yup.boolean().required('required!'),
                    qty: Yup.string().when('checked', {
                        is: true,
                        then: Yup.string().required('required!'),
                        otherwise: Yup.string(),
                    }),
                    package_condition: Yup.string().when('checked', {
                        is: true,
                        then: Yup.string().required('required!'),
                        otherwise: Yup.string(),
                    }),
                    reason: Yup.string().when('checked', {
                        is: true,
                        then: Yup.string().required('required!'),
                        otherwise: Yup.string(),
                    }),
                }),
            ).test({
                message: 'Please choose at least 1 item!',
                test: (arr) => !!(arr?.filter((item) => item?.checked === true).length),
            }),
        }),
        onSubmit: (values) => {
            const { items, ...valueToSubmit } = values;
            valueToSubmit.items = items.filter((x, i) => checkedState[i]);
            handleSubmit(valueToSubmit);
        },
    });

    const handleDropFile = (files, eMap) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        const idx = baseCode.indexOf('base64,');
        formik.setFieldValue(`items[${eMap}].attachment.filename`, fileName);
        formik.setFieldValue(`items[${eMap}].attachment.binary_data`, baseCode.slice(idx + 7));
    };

    const handleOnChange = (eMap) => {
        const updateCheckedState = checkedState.map((item, index) => (index === eMap ? !item : item));
        setCheckedState(updateCheckedState);
        formik.setFieldValue(`items[${eMap}].checked`, !checkedState[eMap]);
    };

    const contentProps = {
        queryOrder,
        formik,
        requestreturn,
        handleDropFile,
        checkedState,
        handleOnChange,
    };

    useEffect(() => {
        document.title = `New Return for Order #${queryOrder}`;
    }, []);

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
