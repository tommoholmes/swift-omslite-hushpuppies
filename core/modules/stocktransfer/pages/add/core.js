import Layout from '@layout';
import { useRouter } from 'node_modules/next/router';
import gqlService from '@modules/stocktransfer/services/graphql';
import React from 'react';

const ContentWrapper = (props) => {
    const { Content } = props;
    const router = useRouter();

    const initialValues = {
        source_location: null,
        target_location: null,
        reason: '',
        apply: false,
        data: [],
    };

    const [createStockTransfer] = gqlService.createStockTransfer();

    const submitHandler = async (values) => {
        window.backdropLoader(true);
        const fixValues = {
            ...values,
            data: values.data.map((item) => ({ ...item, sku: item.sku.sku })),
            source_location: values.source_location.loc_code,
            target_location: values.target_location.loc_code,
        };
        try {
            await createStockTransfer({
                variables: {
                    input: fixValues,
                },
            });

            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success add stock adjustment',
                variant: 'success',
            });
            setTimeout(() => router.push('/cataloginventory/stocktransfer'), 250);
        } catch (error) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: error.message,
                variant: 'error',
            });
        }
    };

    const contentProps = {
        initialValues,
        submitHandler,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => (
    <Layout>
        <ContentWrapper {...props} />
    </Layout>
);

export default Core;
