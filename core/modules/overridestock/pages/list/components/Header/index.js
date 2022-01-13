/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/overridestock/pages/list/components/Header/style';
import gqlService from '@modules/overridestock/services/graphql';

const HeaderContent = ({ syncToMpClicked, setSyncToMpClicked }) => {
    const [getActivity, getActivityRes] = gqlService.getActivity({
        variables: {
            code: 'sync_vs_qty_to_cnx',
            by_session: false,
        },
    });

    useEffect(() => {
        if (syncToMpClicked) {
            getActivity();
            setSyncToMpClicked(false);
        }
    }, [syncToMpClicked]);

    const classes = useStyles();
    const router = useRouter();
    return (
        <>
            {getActivityRes.data && getActivityRes.data.getActivity && getActivityRes.data.getActivity?.activity_id && (
                <p style={{ textAlign: 'right', fontSize: 'semibold' }}>
                    Last Sync To MP by
                    {' '}
                    {getActivityRes.data.getActivity?.run_by_name}
                    {' '}
                    at
                    {' '}
                    {getActivityRes.data.getActivity?.finished_at}
                </p>
            )}
            <div className={classes.headerContainer}>
                <h2 className={classes.title}>Manage Override Stock</h2>
                <Button className={classes.buttonAdd} onClick={() => router.push('/cataloginventory/overridestock/create')}>
                    Add New
                </Button>
                <Button className={classes.buttonAdd} onClick={() => router.push('/cataloginventory/overridestock/sync')}>
                    Sync Stock to MP
                </Button>
                <Button className={classes.buttonAdd} onClick={() => router.push('/cataloginventory/overridestock/import')}>
                    Import Stock
                </Button>
            </div>
        </>
    );
};

export default HeaderContent;
