/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
// import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/wavelist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import useStyles from '@modules/wavelist/pages/pickitem/components/style';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const item = data.getPickByWaveItemById.pick_by_wave_item;

    const itemProps = {
        id: item.entity_id,
        parentId: item.parent_id,
        name: item.name,
        sku: item.sku,
        location: item.bin_code,
        image: item.image_url,
        qty: item.qty_to_pick,
        slot: item.slot_no,
    };

    const contentProps = {
        itemProps,
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

    const pageConfig = {
        title: `Pick by Wave ID ${router.query?.id}`,
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_wave_list',
    });

    if (loading || aclCheckLoading) {
        return (
            <Layout pageConfig={pageConfig}>
                <div className={classes.loadingFetch}>
                    Loading . . .
                </div>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout pageConfig={pageConfig}>
                <div className={classes.loadingFetch}>
                    No records to display
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
