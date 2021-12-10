/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import useStyles from '@modules/promotion/pages/addnew/components/style';
import clsx from 'clsx';

import TextField from '@common_textfield';
import Select from '@common_select';
import Autocomplete from '@common_autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@common_button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const ProductListEditContent = (props) => {
    const {
        formik, dataCompany, dataLocation, dataChannel,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const [productCount, setProductCount] = React.useState(1);
    const [productFree, setProductFree] = React.useState(1);

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/marketing/promotion')}
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
            <h2 className={classes.titleTop}>Add New Promotion</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Company
                            </span>
                        </div>
                        <Select
                            name="company"
                            value={formik.values.company}
                            onChange={formik.handleChange}
                            dataOptions={dataCompany}
                            error={!!(formik.touched.company && formik.errors.company)}
                            selectClasses={classes.fieldInput}
                            formControlClasses={classes.selectControl}
                            enableEmpty={false}
                            fullWidth
                        />
                    </div>
                    <div>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Location
                            </span>
                        </div>
                        <Select
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            dataOptions={dataLocation}
                            error={!!(formik.touched.location && formik.errors.location)}
                            selectClasses={classes.fieldInput}
                            formControlClasses={classes.selectControl}
                            enableEmpty={false}
                            fullWidth
                        />
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Channel
                            </span>
                        </div>
                        <Autocomplete
                            multiple
                            className={classes.autocompleteRoot}
                            name="channel"
                            value={formik.values.channel}
                            onChange={(e) => formik.setFieldValue('channel', e)}
                            primaryKey="value"
                            labelKey="label"
                            options={dataChannel}
                            error={!!(formik.touched.channel && formik.errors.channel)}
                            helperText={(formik.touched.channel && formik.errors.channel) || ''}
                            fullWidth
                        />
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                From Date
                            </span>
                        </div>
                        <TextField
                            variant="outlined"
                            type="date"
                            name="from_date"
                            value={formik.values.from_date}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.from_date && formik.errors.from_date)}
                            helperText={(formik.touched.from_date && formik.errors.from_date) || ''}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInputFilter,
                            }}
                            fullWidth
                        />
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                From Date
                            </span>
                        </div>
                        <TextField
                            variant="outlined"
                            type="date"
                            name="to_date"
                            value={formik.values.to_date}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.to_date && formik.errors.to_date)}
                            helperText={(formik.touched.to_date && formik.errors.to_date) || ''}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInputFilter,
                            }}
                            fullWidth
                        />
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Rule Type
                            </span>
                        </div>
                        <TextField
                            variant="outlined"
                            name="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.type && formik.errors.type)}
                            helperText={(formik.touched.type && formik.errors.type) || ''}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInputFilter,
                            }}
                            fullWidth
                        />
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Name
                            </span>
                        </div>
                        <TextField
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name) || ''}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInputFilter,
                            }}
                            fullWidth
                        />
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Description
                            </span>
                        </div>
                        <TextField
                            variant="outlined"
                            name="type"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.description && formik.errors.description)}
                            helperText={(formik.touched.description && formik.errors.description) || ''}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInputFilter,
                            }}
                            fullWidth
                        />
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Max Promotion
                            </span>
                        </div>
                        <TextField
                            variant="outlined"
                            name="max_promotion_number"
                            value={formik.values.max_promotion_number}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.max_promotion_number && formik.errors.max_promotion_number)}
                            helperText={(formik.touched.max_promotion_number && formik.errors.max_promotion_number) || ''}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInputFilter,
                            }}
                            fullWidth
                        />
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Promotion Enable
                            </span>
                        </div>
                        <Select
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            dataOptions={[{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }]}
                            error={!!(formik.touched.status && formik.errors.status)}
                            selectClasses={classes.fieldInput}
                            formControlClasses={classes.selectControl}
                            enableEmpty={false}
                            fullWidth
                        />
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Promotion Method
                            </span>
                        </div>
                        <Select
                            name="method"
                            value={formik.values.method}
                            onChange={formik.handleChange}
                            dataOptions={[{ label: 'Or', value: 0 }, { label: 'And', value: 1 }]}
                            error={!!(formik.touched.method && formik.errors.method)}
                            selectClasses={classes.fieldInput}
                            formControlClasses={classes.selectControl}
                            enableEmpty={false}
                            fullWidth
                        />
                    </div>

                    <div className={classes.gridAttribute}>
                        <div />
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    name="all_product_qty_check"
                                    checked={formik.values.all_product_qty_check}
                                    onChange={formik.handleChange}
                                />
                            )}
                            className={classes.controlLabel}
                            classes={{ root: classes.rootLabel }}
                            label="All Product QTY"
                        />
                    </div>
                    {formik.values.all_product_qty_check
                        ? (
                            <div className={classes.gridAttribute}>
                                <div />
                                <TextField
                                    variant="outlined"
                                    name="all_product_qty"
                                    value={formik.values.all_product_qty}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.all_product_qty && formik.errors.all_product_qty)}
                                    helperText={(formik.touched.all_product_qty && formik.errors.all_product_qty) || ''}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        className: classes.fieldInputFilter,
                                    }}
                                    fullWidth
                                />
                            </div>
                        )
                        : null}

                    <div className={classes.gridAttribute}>
                        <div />
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    name="multiple_price_check"
                                    checked={formik.values.multiple_price_check}
                                    onChange={formik.handleChange}
                                />
                            )}
                            className={classes.controlLabel}
                            classes={{ root: classes.rootLabel }}
                            label="Multiple Total Price"
                        />
                    </div>
                    {formik.values.multiple_price_check
                        ? null : (
                            <div className={classes.gridAttribute}>
                                <div
                                    className={classes.divLabel}
                                >
                                    <span className={classes.label}>
                                        Minimal Total Price
                                    </span>
                                </div>
                                <TextField
                                    variant="outlined"
                                    name="minimum_total_price"
                                    value={formik.values.minimum_total_price}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.minimum_total_price && formik.errors.minimum_total_price)}
                                    helperText={(formik.touched.minimum_total_price && formik.errors.minimum_total_price) || ''}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        className: classes.fieldInputFilter,
                                    }}
                                    fullWidth
                                />
                            </div>
                        )}
                </div>

                {formik.values.all_product_qty_check
                    ? null : (
                        <div className={classes.content}>
                            <div className={classes.titleWithButton}>
                                <h5 className={classes.titleSmall}>Product Lines</h5>
                                <div>
                                    <Button
                                        className={classes.buttonCount}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setProductCount(productCount + 1)}
                                    >
                                        <AddIcon />
                                    </Button>
                                    <Button
                                        className={classes.buttonCount}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => (productCount > 0 ? setProductCount(productCount - 1) : null)}
                                    >
                                        <RemoveIcon />
                                    </Button>
                                </div>
                            </div>
                            <div className={classes.gridInputTitle} style={{ gridTemplateColumns: '70% 30%' }}>
                                <div
                                    className={classes.divLabel}
                                >
                                    <span className={classes.label}>
                                        SKU
                                    </span>
                                </div>
                                <div
                                    className={classes.divLabel}
                                >
                                    <span className={classes.label}>
                                        QTY
                                    </span>
                                </div>
                            </div>
                            {[...Array(productCount)].map((e, idx) => (
                                <div className={classes.gridInput} key={idx} style={{ gridTemplateColumns: '70% 30%' }}>
                                    <TextField
                                        variant="outlined"
                                        name={`sku[${idx}]`}
                                        value={formik.values?.sku[idx]}
                                        onChange={formik.handleChange}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            className: classes.fieldInputFilter,
                                        }}
                                    />
                                    <TextField
                                        variant="outlined"
                                        name={`qty[${idx}]`}
                                        value={formik.values?.qty[idx]}
                                        onChange={formik.handleChange}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            className: classes.fieldInputFilter,
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                <div className={classes.content}>
                    <div className={classes.titleWithButton}>
                        <h5 className={classes.titleSmall}>Product Free Lines</h5>
                        <div>
                            <Button
                                className={classes.buttonCount}
                                variant="contained"
                                color="secondary"
                                onClick={() => setProductFree(productFree + 1)}
                            >
                                <AddIcon />
                            </Button>
                            <Button
                                className={classes.buttonCount}
                                variant="contained"
                                color="secondary"
                                onClick={() => (productFree > 0 ? setProductFree(productFree - 1) : null)}
                            >
                                <RemoveIcon />
                            </Button>
                        </div>
                    </div>

                    {!formik.values.multiple_price_check
                        ? (
                            <>
                                <div className={classes.gridInputTitle} style={{ gridTemplateColumns: '70% 30%' }}>
                                    <div
                                        className={classes.divLabel}
                                    >
                                        <span className={classes.label}>
                                            SKU
                                        </span>
                                    </div>
                                    <div
                                        className={classes.divLabel}
                                    >
                                        <span className={classes.label}>
                                            QTY
                                        </span>
                                    </div>
                                </div>
                                {[...Array(productCount)].map((e, idx) => (
                                    <div className={classes.gridInput} key={idx} style={{ gridTemplateColumns: '70% 30%' }}>
                                        <TextField
                                            variant="outlined"
                                            name={`sku[${idx}]`}
                                            value={formik.values?.sku[idx]}
                                            onChange={formik.handleChange}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                className: classes.fieldInputFilter,
                                            }}
                                        />
                                        <TextField
                                            variant="outlined"
                                            name={`qty[${idx}]`}
                                            value={formik.values?.qty[idx]}
                                            onChange={formik.handleChange}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                className: classes.fieldInputFilter,
                                            }}
                                        />
                                    </div>
                                ))}
                            </>
                        )
                        : (
                            <>
                                <div className={classes.gridInputTitle} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                                    <div
                                        className={classes.divLabel}
                                    >
                                        <span className={classes.label}>
                                            Min Price
                                        </span>
                                    </div>
                                    <div
                                        className={classes.divLabel}
                                    >
                                        <span className={classes.label}>
                                            Max Price
                                        </span>
                                    </div>
                                    <div
                                        className={classes.divLabel}
                                    >
                                        <span className={classes.label}>
                                            SKU
                                        </span>
                                    </div>
                                    <div
                                        className={classes.divLabel}
                                    >
                                        <span className={classes.label}>
                                            QTY
                                        </span>
                                    </div>
                                </div>
                                {[...Array(productFree)].map((e, idx) => (
                                    <div className={classes.gridInput} key={idx} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                                        <TextField
                                            variant="outlined"
                                            name={`sku[${idx}]`}
                                            value={formik.values?.sku[idx]}
                                            onChange={formik.handleChange}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                className: classes.fieldInputFilter,
                                            }}
                                        />
                                        <TextField
                                            variant="outlined"
                                            name={`sku[${idx}]`}
                                            value={formik.values?.sku[idx]}
                                            onChange={formik.handleChange}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                className: classes.fieldInputFilter,
                                            }}
                                        />
                                        <TextField
                                            variant="outlined"
                                            name={`sku[${idx}]`}
                                            value={formik.values?.sku[idx]}
                                            onChange={formik.handleChange}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                className: classes.fieldInputFilter,
                                            }}
                                        />
                                        <TextField
                                            variant="outlined"
                                            name={`qty[${idx}]`}
                                            value={formik.values?.qty[idx]}
                                            onChange={formik.handleChange}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                className: classes.fieldInputFilter,
                                            }}
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        Submit
                    </Button>
                    {Object.keys(formik.errors).length !== 0
                        && (
                            <div className={classes.errorHtml}>
                                <div style={{ paddingLeft: 5 }}>Please make sure all required field is filled!</div>
                            </div>
                        )}
                </div>
            </Paper>
        </>
    );
};

export default ProductListEditContent;
