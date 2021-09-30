/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import clsx from 'clsx';
import useStyles from '@modules/batchlist/pages/edit/picklist/components/style';

const PickListEditContent = (props) => {
    const {
        pickList,
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

    return (
        <>
            <div style={{ position: 'relative' }}>
                <Button
                    className={classes.btnBack}
                    onClick={() => router.push(`/pickpack/batchlist/edit/${pickList.parentId}`)}
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
                    {`Pick List ${pickList.id}`}
                </h2>
                <h2 className={classes.titleTopSmall}>
                    {`Batch #${pickList.parentId}`}
                </h2>
            </div>
            <Paper className={classes.container}>
                <div className={classes.headerContent}>
                    <div>
                        <span className={getValueStatus(pickList.statusValue)}>{pickList.statusLabel}</span>
                    </div>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Date : ${pickList.date || '-'}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Total Order : ${pickList.totalItems}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Picker : ${pickList.picker || '-'}`}</h5>
                        </div>
                    </div>
                </div>
                {pickList.items.map((e) => (
                    <div className={classes.content}>
                        <a href={`/pickpack/batchlist/edit/picklist/${e.entity_id}`}>
                            <table className={classes.table}>
                                <thead>
                                    <tr className={classes.tr}>
                                        <th className={classes.th} style={{ paddingLeft: 0 }}>SKU</th>
                                        <th className={classes.th}>QTY</th>
                                        <th className={classes.th}>LOCATION</th>
                                        <th className={classes.th} style={{ paddingRight: 0 }}> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className={classes.td} style={{ paddingLeft: 0 }}>{e.sku}</td>
                                        <td className={classes.td}>{`${e.qty_picked}/${e.qty_to_pick}`}</td>
                                        <td className={classes.td}>{`LOC ${e.bin_code}`}</td>
                                        <td className={classes.td} style={{ paddingRight: 0 }}>{e.barcode}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </a>
                    </div>
                ))}
                <diV className={classes.footer}>
                    <div style={{ width: '60%', display: 'inline-block', padding: 20 }}>
                        <h2>50</h2>
                        <span>items left to pick</span>
                    </div>
                    <button
                        className={classes.btnFooter}
                        type="submit"
                        // onClick={formik.handleSubmit}
                    >
                        Done Picking
                    </button>
                </diV>
            </Paper>
        </>
    );
};

export default PickListEditContent;
