/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import React from 'react';
import Layout from '@layout';
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

    let [count, setCount] = React.useState(picklist.qty_picked);

    const handleSubmit = () => {
        const variables = {
            item_id: picklist.entity_id,
            qty_picked: count,
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

    const incrementCount = () => {
        if (count < pickList.qty) {
            count += 1;
        }
        setCount(count);
    };

    const decrementCount = () => {
        if (count > 0) {
            count -= 1;
        }
        setCount(count);
    };

    const handleDetect = (code) => {
        if (code === picklist.barcode) {
            incrementCount();
        }
    };

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
        barcode: picklist.barcode,
    };

    const contentProps = {
        pickList,
        incrementCount,
        decrementCount,
        handleDetect,
        count,
        setCount,
        handleSubmit,
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
        <Layout useBreadcrumbs={false}>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
