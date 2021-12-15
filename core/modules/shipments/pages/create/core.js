/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import gqlService from '@modules/shipments/services/graphql';
import { optionsYesNo } from '@modules/shipments/helpers';
import gqlConfig from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const ContentWrapper = (props) => {
    const { Content, data, storeConfigData } = props;
    const [updateStoreConfig] = gqlService.updateStoreConfig();
    const handleSubmit = async (values) => {
        window.backdropLoader(true);
        const arrayValue = Object.keys(values).map((key) => {
            if (values[key] && typeof values[key] === 'object' && key !== 'swiftoms_shipment_courier_options') {
                if (
                    key === 'sapcod_use_sandbox'
                    || key === 'shipperid_allow_free'
                    || key === 'shipperid_auto_booking'
                    || key === 'shipperid_insurance'
                ) {
                    return { [key]: values[key].id };
                }
                return { [key]: Number(values[key].id) };
            }
            if (key === 'gosend_key') {
                return { gosend_google_key: values[key] };
            }
            if (key === 'grabexpress_sms_enabled') {
                return { grabexpress_sender_sms_enabled: values[key] };
            }

            if (key === 'sapcod_sapcod_key') {
                return { sapcod_key: values[key] };
            }

            if (key.includes('jne') && key.split('_').length > 2) {
                const fixJneKey = `${key.split('_')[0]}_${key.split('_')[2]}`;
                if (fixJneKey === 'jneshipping_key') {
                    return { jneshipping_apikey: values[key] };
                }
                if (fixJneKey === 'jneshipping_url') {
                    return { jneshipping_generate_cnote: values[key] };
                }
                return { [fixJneKey]: values[key] };
            }

            return { [key]: values[key] };
        });

        const valueObject = arrayValue.reduce((acc, val) => Object.assign(acc, { [Object.keys(val)[0]]: val[Object.keys(val)[0]] }), {});

        const swiftoms_shipment_courier_options = valueObject.swiftoms_shipment_courier_options.reduce((acc, val) => Object.assign(acc, { [Object.keys(val)[0]]: val[Object.keys(val)[0]] }), {});

        const fixValues = { ...valueObject, swiftoms_shipment_courier_options: JSON.stringify(swiftoms_shipment_courier_options) };

        try {
            await updateStoreConfig({
                variables: {
                    input: fixValues,
                },
            });
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success edit Shipment  configuration ',
                variant: 'success',
            });
        } catch (error) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: error.message,
                variant: 'error',
            });
        }
    };

    const [shippingCourir, setshippingCourir] = React.useState(() => {
        if (storeConfigData) {
            const jsonData = JSON.parse(storeConfigData);
            return Object.keys(jsonData).map((key, idx) => ({ [`item${idx + 1}`]: jsonData[key] }));
        }
        return [];
    });
    const contentProps = {
        handleSubmit,
        shippingCourir,
        data,
    };
    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { data, loading } = gqlService.getConfigShippingMethod();
    const { data: storeConfigData, loading: StoreConfigLoading } = gqlConfig.getStoreConfig({
        path: 'swiftoms_shipment/courier/courier_options',
    });

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = gqlConfig.isAccessAllowed({
        acl_code: 'oms_lite_config_shipments',
    });

    if (loading || StoreConfigLoading || aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    let newData = [];

    if (data) {
        newData = data?.getConfigShippingMethod?.length > 0
            && data.getConfigShippingMethod.map((val) => {
                const shippingMethod = val.path.split('/')[1];
                const config = val.path.split('/')[2];
                const key = `${shippingMethod}_${config}`;
                if (
                    key.includes('active')
                    || key.includes('mode')
                    || key.includes('allow')
                    || key.includes('is')
                    || key.includes('use')
                    || key.includes('auto_booking')
                    || key.includes('insurance')
                ) {
                    const option = optionsYesNo.filter((opt) => opt.id === val.value);
                    return { [key]: option.length > 0 ? option[0] : val.value };
                }
                return { [key]: val.value };
            });

        newData = newData.reduce((acc, val) => Object.assign(acc, { [Object.keys(val)[0]]: val[Object.keys(val)[0]] }), {});
    }

    return (
        <Layout>
            <ContentWrapper {...props} data={newData} storeConfigData={storeConfigData?.getStoreConfig} />
        </Layout>
    );
};

export default Core;
