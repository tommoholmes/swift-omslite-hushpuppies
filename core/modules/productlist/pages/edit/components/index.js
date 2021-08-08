/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import Autocomplete from '@common_autocomplete';
import { optionsStatus } from '@modules/productlist/helpers';
import clsx from 'clsx';
import useStyles from './style';

const ProductListEditContent = (props) => {
    const {
        formik,
        stockList,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/productlist')}
                variant="contained"
                style={{ marginRight: 16 }}
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
            <h2 className={classes.titleTop}>Product Detail</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.title}>
                        Details
                        {formik.values.name}
                    </h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Status</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.status}
                            onChange={(e) => formik.setFieldValue('status', e)}
                            options={optionsStatus}
                            error={!!(formik.touched.status && formik.errors.status)}
                            helperText={(formik.touched.status && formik.errors.status) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Attribute Set</span>
                        </div>
                        <TextField
                            disabled
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="attribute"
                            value={formik.values.attribute}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Product Name</span>
                        </div>
                        <TextField
                            disabled
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>SKU</span>
                        </div>
                        <TextField
                            disabled
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="sku"
                            value={formik.values.sku}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Price</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.price && formik.errors.price)}
                            helperText={(formik.touched.price && formik.errors.price) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Special Price</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="specialPrice"
                            value={formik.values.specialPrice}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.specialPrice && formik.errors.specialPrice)}
                            helperText={(formik.touched.specialPrice && formik.errors.specialPrice) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel} />
                        <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                            <div className={classes.divLabel} style={{ width: '82px' }}>
                                <span className={classes.label}>From Date: </span>
                            </div>
                            <TextField
                                style={{ width: '170px' }}
                                className={classes.fieldRoot}
                                id="date"
                                type="date"
                                variant="outlined"
                                name="dateFrom"
                                value={formik.values.dateFrom}
                                onChange={formik.handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel} />
                        <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                            <div className={classes.divLabel} style={{ width: '82px' }}>
                                <span className={classes.label}>To: </span>
                            </div>
                            <TextField
                                style={{ width: '170px' }}
                                className={classes.fieldRoot}
                                id="date"
                                type="date"
                                variant="outlined"
                                name="dateTo"
                                value={formik.values.dateTo}
                                onChange={formik.handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Weight</span>
                        </div>
                        <TextField
                            disabled
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="weight"
                            value={formik.values.weight}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Visibility</span>
                        </div>
                        <TextField
                            disabled
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="visibility"
                            value={formik.values.visibility}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Description</span>
                        </div>
                        <TextField
                            disabled
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="description"
                            value={formik.values.description}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formFieldButton}>
                        <Button
                            className={classes.btn}
                            onClick={formik.handleSubmit}
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
                <div className={classes.content}>
                    <h2 className={classes.title}>Stock List</h2>
                    <div className={classes.formField}>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.tr}>
                                    <th className={classes.th}>Location</th>
                                    <th className={classes.th}>Qty Total</th>
                                    <th className={classes.th}>Qty Reserved</th>
                                    <th className={classes.th}>Qty Saleable</th>
                                </tr>
                                {stockList.sourcing.map((e) => (
                                    <tr>
                                        <td className={classes.td}>{e.loc_name}</td>
                                        <td className={classes.td}>{e.qty_total}</td>
                                        <td className={classes.td}>{e.qty_reserved}</td>
                                        <td className={classes.td}>{e.qty_saleable}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default ProductListEditContent;
