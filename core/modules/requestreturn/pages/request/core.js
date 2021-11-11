/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import React from 'react';
import { useRouter } from 'next/router';
import gqlService from '@modules/requestreturn/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const router = useRouter();
    const customer_email = router && router.query && router.query.email;
    const channel_order_increment_id = router && router.query && router.query.order;
    const channel_code = router && router.query && router.query.channel;
    const [getRequestReturnList, { data, loading }] = gqlService.getRequestReturnList();

    const contentProps = {
        getRequestReturnList,
        data,
        loading,
        customer_email,
        channel_order_increment_id,
        channel_code,
    };

    return (
        <Content {...contentProps} />
    );
};

export default Core;
