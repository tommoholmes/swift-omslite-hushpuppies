import React, { useEffect, useRef, useState } from 'react';
import Layout from '@layout';
import gqlService from '@modules/vendorbulktools/services/graphql';
import { bulkToolsOptions } from '@modules/vendorbulktools/helpers';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const ContentWrapper = (props) => {
    const { Content } = props;
    const [isAccessAllowedLazy, { data, loading }] = gqlService.isAccessAllowedLazy();
    const [bulkToolsOptionsState, setBulkToolsOptionsState] = useState([]);
    const [bulkType, setBulkType] = useState(null);
    const indexRef = useRef(0);

    useEffect(() => {
        if (indexRef.current < bulkToolsOptions.length) {
            isAccessAllowedLazy({
                variables: {
                    acl_code: bulkToolsOptions[indexRef.current]?.acl ?? '',
                },
            });
        }
    }, [indexRef.current]);

    useEffect(() => {
        if (data && data.isAccessAllowed && bulkToolsOptions[indexRef.current]) {
            setBulkToolsOptionsState([...bulkToolsOptionsState, bulkToolsOptions[indexRef.current]]);
            indexRef.current += 1;
        }
        if (!indexRef.current < bulkToolsOptions.length) {
            setBulkType(bulkToolsOptionsState[0]);
        }
    }, [data, loading]);

    if (indexRef.current < bulkToolsOptions.length) {
        return <Layout>Loading...</Layout>;
    }

    const contentProps = {
        bulkToolsOptionsState,
        setBulkType,
        bulkType,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_bulk_tools',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <>
            <ContentWrapper {...props} />
        </>
    );
};

export default Core;
