/* eslint-disable no-nested-ternary */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/wavelist/pages/picklist/components/style';

const BatchListPickListContent = (props) => {
    const {
        waveList, formikDone,
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
        return classes.gray;
    };

    const getIcon = (qty_picked, qty_to_pick) => {
        if (qty_to_pick === qty_picked) {
            return classes.checkmark;
        }
        return classes.exclamation;
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/pickpack/wavelist')}
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
                {`Wave #${waveList.id}`}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.headerContent}>
                    <div style={{ marginBottom: 10 }}>
                        <span className={getValueStatus(waveList.statusValue)}>{waveList.statusLabel}</span>
                    </div>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Date : ${waveList.date}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Picker : ${waveList.picker}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Total Shipment : ${waveList.totalShipments}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Total SKU : ${waveList.totalItems}`}</h5>
                        </div>
                    </div>
                </div>
                {waveList.items.slice().sort((a, b) => a.is_confirmed - b.is_confirmed).map((e) => (
                    <div className={classes.content} key={e.entity_id}>
                        <div className={classes.gridList}>
                            <div>
                                <h5
                                    className={classes.titleList}
                                >
                                    SKU
                                </h5>
                                <h5 className={classes.bodyList} style={{ textAlign: 'left' }}>{e.sku}</h5>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <h5
                                    className={classes.titleList}
                                >
                                    QTY
                                </h5>
                                <h5 className={classes.bodyList}>
                                    {`${e.qty_picked}/${e.qty_to_pick}`}
                                </h5>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <h5
                                    className={classes.titleList}
                                >
                                    LOCATION
                                </h5>
                                <h5 className={classes.bodyList}>{e.bin_code}</h5>
                                {e.is_confirmed}
                            </div>
                            <h5 className={classes.bodyList} style={{ textAlign: 'right' }}>
                                {e.is_confirmed ? (
                                    e.qty_picked === e.qty_to_pick
                                        ? <span className={getIcon(e.qty_picked, e.qty_to_pick)} />
                                        : (waveList.statusValue === 'pick_in_progress' || waveList.statusValue === 'pick_uncomplete'
                                            ? (
                                                <a href={`/pickpack/wavelist/picklist/item/${e.entity_id}`}>

                                                    <span className={getIcon(e.qty_picked, e.qty_to_pick)} />
                                                </a>
                                            )
                                            : <span className={getIcon(e.qty_picked, e.qty_to_pick)} />
                                        )
                                )
                                    : (waveList.statusValue === 'pick_in_progress' || waveList.statusValue === 'pick_uncomplete'
                                        ? (
                                            <a href={`/pickpack/wavelist/picklist/item/${e.entity_id}`}>

                                                <img className="imgIcon" alt="" src="/assets/img/iconbarcode.svg" />
                                            </a>
                                        )
                                        : <img className="imgIcon" alt="" src="/assets/img/iconbarcode.svg" />
                                    )}
                            </h5>
                        </div>
                    </div>
                ))}
                {waveList.statusValue === 'pick_in_progress'
                    ? (
                        <div className={classes.footer}>
                            <div style={{ width: '60%', display: 'inline-block', padding: 20 }}>
                                <h2>{waveList.itemsLeft}</h2>
                                <span>items left to pick</span>
                            </div>
                            {/* {(waveList.itemsLeft === 0) ? ( */}
                            <button
                                className={classes.btnFooter}
                                type="submit"
                                onClick={formikDone.handleSubmit}
                            >
                                Done Picking
                            </button>
                            {/* ) : (
                                <button
                                    className={classes.btnFooterDisabled}
                                    type="submit"
                                    disabled
                                >
                                    Done Picking
                                </button>
                            )} */}
                        </div>
                    )
                    : null}
            </Paper>
        </>
    );
};

export default BatchListPickListContent;
