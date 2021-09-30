/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/batchlist/pages/edit/components/style';

const BatchListEditContent = (props) => {
    const {
        batchList,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const getValueStatus = (status) => {
        if (status === 'new') {
            return classes.green;
        }
        if (status === 'pick_in_progress' || status === 'sorting_in_progress') {
            return classes.orange;
        }
        if (status === 'pick_uncomplete') {
            return classes.red;
        }
        return classes.grey;
    };

    const getIcon = (status) => {
        if (status === 'pick_in_progress' || status === 'sorting_in_progress') {
            return classes.loading;
        }
        if (status === 'pick_uncomplete') {
            return classes.checkmark;
        }
        return classes.exclamation;
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/pickpack/batchlist')}
                variant="contained"
                style={{ marginRight: 10 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.titleTop}>
                {`Batch #${batchList.id}`}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.headerContent}>
                    <div>
                        <span className={getValueStatus(batchList.statusValue)}>{batchList.statusLabel}</span>
                    </div>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Date : ${batchList.date}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Total Order : ${batchList.totalShipments}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Pick List : ${batchList.picklist.length}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Total SKU : ${batchList.totalItems}`}</h5>
                        </div>
                    </div>
                </div>
                {batchList.picklist.map((e) => (
                    <div className={classes.content}>
                        <a href={`/pickpack/batchlist/edit/picklist/${e.entity_id}`}>
                            <div className={classes.gridList}>
                                <h5 className={classes.titleList} style={{ textAlign: 'left' }}>{`PICK LIST ${e.entity_id}`}</h5>
                                <h5 className={classes.titleList}>{`${e.total_items} SKU`}</h5>
                                <h5 className={classes.titleList}>
                                    {(e.picked_by) ? (
                                        <>{`Picked by ${e.picked_by}`}</>
                                    ) : null}
                                </h5>
                                <h5 className={classes.titleList} style={{ textAlign: 'right' }}>
                                    {!(e.status.value === 'new') ? (
                                        <span className={getIcon(e.status.value)} />
                                    ) : <span className={classes.spanStart}>Start Picking</span>}
                                </h5>
                            </div>
                        </a>
                    </div>
                ))}
            </Paper>
        </>
    );
};

export default BatchListEditContent;
