import Layout from '@layout';
import { useRouter } from 'node_modules/next/router';
import gqlService from '@modules/stockadjustment/services/graphql';
import React from 'react';

const ContentWrapper = (props) => {
    const { Content, data } = props;
    const router = useRouter();

    const initialValues = {
        increment_id: data?.increment_id ?? '',
        adjustment_id: data?.entity_id ?? 0,
        loc_code: data?.loc_code ? { loc_code: data?.loc_code, loc_name: data?.loc_name ?? '' } : { loc_code: '', loc_name: '' },
        reason: data?.reason ?? '',
        is_apply: false,
        items:
            data?.items?.map((item) => ({
                sku: item.sku,
                entity_id: item.entity_id,
                stock_adjustment: item.change_qty,
                stock_available: item.old_qty,
            })) ?? [],
        status: data?.status ?? '',
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
        delete fixValues.status;
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

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getStockAdjustmentById({
        id: router && router.query && Number(router.query.id),
    });

    if (loading) {
        return <Layout>Loading...</Layout>;
    }

    if (!data) {
        return <Layout>Data not found!</Layout>;
    }

    return (
        <Layout>
            <ContentWrapper data={data.getStockAdjustmentById} {...props} />
        </Layout>
    );
};

export default Core;
