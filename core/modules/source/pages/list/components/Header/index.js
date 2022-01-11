/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/source/pages/list/components/Header/style';
import aclService from '@modules/theme/services/graphql';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();

    const { loading: aclCreateSourceLoading, data: aclCreateSourceData } = aclService.isAccessAllowed({
        acl_code: 'source_create',
    });
    const { loading: aclUpdateSourceLoading, data: aclUpdateSourceData } = aclService.isAccessAllowed({
        acl_code: 'source_update',
    });

    const isAllowCreateSource = (aclCreateSourceData && aclCreateSourceData.isAccessAllowed) || false;
    const isAllowUpdateSource = (aclUpdateSourceData && aclUpdateSourceData.isAccessAllowed) || false;

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Manage Source</h2>
            {!aclCreateSourceLoading && isAllowCreateSource && (
                <Button className={classes.buttonAdd} onClick={() => router.push('/cataloginventory/source/importdata')}>
                    Create Source
                </Button>
            )}
            {!aclUpdateSourceLoading && isAllowUpdateSource && (
                <Button className={classes.buttonAdd} onClick={() => router.push('/cataloginventory/source/import')}>
                    Update Source
                </Button>
            )}

            <Button className={classes.buttonAdd} onClick={() => router.push('/cataloginventory/source/export')}>
                Export
            </Button>
        </div>
    );
};

export default HeaderContent;
