/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import React, { useState } from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchlist/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const router = useRouter();
    const picklist = data.getPickByBatchItemById.pick_by_batch_item;
    const [updatePickByBatchItem] = gqlService.updatePickByBatchItem();

    let [count, setCount] = useState(0);

    function incrementCount() {
        if (count < pickList.qty) {
            count += 1;
        }
        setCount(count);
    }

    function decrementCount() {
        if (count > 0) {
            count -= 1;
        }
        setCount(count);
    }

    const handleSubmit = ({
        itemId,
        qtyPicked,
    }) => {
        const variables = {
            item_id: itemId,
            qty_picked: Number(qtyPicked),
        };
        window.backdropLoader(true);
        updatePickByBatchItem({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success update qty!',
                variant: 'success',
            });
            setTimeout(() => router.push(`/pickpack/batchlist/edit/picklist/${pickList.parentId}`), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const pickList = {
        parentId: picklist.parent_id,
        id: picklist.entity_id,
        name: picklist.name,
        sku: picklist.sku,
        location: picklist.bin_code,
        qty: picklist.qty_to_pick,
        qtyPicked: picklist.qty_picked,
    };

    const formik = useFormik({
        initialValues: {
            itemId: picklist.entity_id,
            qtyPicked: picklist.qty_picked,
        },
        // validationSchema: Yup.object().shape({
        //     id: Yup.Number().required('Required!'),
        //     qtyPicked: Yup.Number().required('Required!'),
        // }),
        onSubmit: (values) => {
            handleSubmit(values);
            // console.log(values);
        },
    });

    const contentProps = {
        pickList,
        count,
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
    const { loading, data } = gqlService.getPickByBatchItemById({
        id: router && router.query && Number(router.query.id),
    });

    if (loading) {
        return (
            <Layout>Loading...</Layout>
        );
    }

    if (!data) {
        return (
            <Layout>Data not found!</Layout>
        );
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
