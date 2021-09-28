import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/printoms/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const addresslist = data.getAddress;

    const addressList = {
        date: addresslist.print_date,
        dataAddress: addresslist.data,
    };

    const contentProps = {
        addressList,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getAddress({
        id: router && router.query && router.query.slug.map((e) => Number(e)),
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
        <ContentWrapper data={data} {...props} />
    );
};

export default Core;
