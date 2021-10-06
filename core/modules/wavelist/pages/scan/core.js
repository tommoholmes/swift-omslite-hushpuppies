/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/wavelist/services/graphql';
import useStyles from '@modules/wavelist/pages/pickitem/components/style';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const router = useRouter();
    const picklist = data.getPickByWaveItemById.pick_by_wave_item;
    const [updatePickByWaveItem] = gqlService.updatePickByWaveItem();

    const handleSubmit = ({
        itemId,
        qtyPicked,
    }) => {
        const variables = {
            item_id: itemId,
            qty_picked: Number(qtyPicked),
        };
        window.backdropLoader(true);
        updatePickByWaveItem({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success update qty!',
                variant: 'success',
            });
            setTimeout(() => router.push(`/pickpack/wavelist/picklist/${picklist.parent_id}`), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    function incrementCount() {
        if (formik.values.qtyPicked < pickList.qty) {
            formik.setFieldValue('qtyPicked', formik.values.qtyPicked + 1);
        }
    }

    function decrementCount() {
        if (formik.values.qtyPicked > 0) {
            formik.setFieldValue('qtyPicked', formik.values.qtyPicked - 1);
        }
    }

    const pickList = {
        id: picklist.entity_id,
        parentId: picklist.parent_id,
        name: picklist.name,
        sku: picklist.sku,
        location: picklist.bin_code,
        image: picklist.image_url,
        qty: picklist.qty_to_pick,
        qtyPicked: picklist.qty_picked,
        slot: picklist.slot_no,
    };

    const formik = useFormik({
        initialValues: {
            itemId: picklist.entity_id,
            qtyPicked: picklist.qty_picked,
        },
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        pickList,
        incrementCount,
        decrementCount,
        formik,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getPickByWaveItemById({
        item_id: router && router.query && Number(router.query.id),
    });
    const classes = useStyles();

    if (loading) {
        return (
            <Layout>
                <div className={classes.loadingFetch}>
                    Loading . . .
                </div>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout>
                <div className={classes.loadingFetch}>
                    No records to display
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
