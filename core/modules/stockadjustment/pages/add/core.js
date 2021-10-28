import Layout from '@layout';
import { useRouter } from 'node_modules/next/router';
import gqlService from '@modules/stockadjustment/services/graphql';
import React from 'react';

const ContentWrapper = (props) => {
    const { Content } = props;
    const router = useRouter();

    const initialValues = {
        loc_code: null,
        reason: '',
        is_apply: false,
        items: [],
    };

    const [addStockAdjustment] = gqlService.addStockAdjustment();

    const submitHandler = async (values) => {
        window.backdropLoader(true);
        const fixValues = { ...values, loc_code: values.loc_code.loc_code };
        const items = values.items.map((val) => {
            const temp = { ...val };
            if (!temp.entity_id) {
                delete temp.entity_id;
            }
            return { ...temp, sku: typeof temp.sku === 'object' ? temp.sku.sku : temp.sku };
        });
        fixValues.items = [...items];
        delete fixValues.increment_id;

        try {
            await addStockAdjustment({
                variables: {
                    input: fixValues,
                },
            });

            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success edit stock adjustment',
                variant: 'success',
            });
            setTimeout(() => router.push('/cataloginventory/stockadjustment'), 250);
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
