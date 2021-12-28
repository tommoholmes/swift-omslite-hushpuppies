import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/stocktransfer/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const { data, Content } = props;
    const stockTransfer = data.getStockTransferById;
    const router = useRouter();

    const initialValues = {
        entity_id: stockTransfer.entity_id,
        increment_id: stockTransfer.increment_id,
        source_location: stockTransfer.source_loc_code ? { loc_name: stockTransfer.source_loc_name, loc_code: stockTransfer.source_loc_code } : null,
        target_location: stockTransfer.target_loc_code ? { loc_name: stockTransfer.target_loc_name, loc_code: stockTransfer.target_loc_code } : null,
        reason: stockTransfer.reason,
        apply: false,
        data: stockTransfer.items.map((item) => ({
            ...item,
            sku: { sku: item.sku, source_id: item.source_id },
            transfer: item.transfer_qty,
            qty: item.source_qty,
        })),
    };

    const [updateStockTransfer] = gqlService.updateStockTransfer();

    const submitHandler = async (values) => {
        window.backdropLoader(true);
        const fixValues = {
            ...values,
            data: values.data.map((item) => ({ sku: item.sku.sku, qty: item.qty, transfer: item.transfer })),
            source_location: values.source_location.loc_code,
            target_location: values.target_location.loc_code,
        };
        const id = fixValues.entity_id;
        delete fixValues.increment_id;
        delete fixValues.entity_id;
        try {
            await updateStockTransfer({
                variables: {
                    id,
                    input: fixValues,
                },
            });

            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success edit stock adjustment',
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

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getStockTransferById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_stock_transfer',
    });

    if (loading || aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: 'Data not found!',
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/cataloginventory/stocktransfer');
        }, 1000);
        return (
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    Data not found!
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
