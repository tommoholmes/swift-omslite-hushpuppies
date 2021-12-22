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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@common_button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import _ from 'lodash';

const ProductListEditContent = (props) => {
    const {
        formik, dataCompany, dataLocation, loadingLocation,
        promotionItems, setPromotionItems, promotionFree, setPromotionFree,
        isPromotionSkuExist, skuCheck, loadingChannel, dataChannel,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const sendQuery = (e, type) => {
        const { value } = e.target;
        if (value) {
            isPromotionSkuExist({
                variables: {
                    sku: value,
                    type,
                },
            });
            formik.handleBlur(e);
        }
    };
    const delayedQuery = React.useCallback(_.debounce((q, type) => sendQuery(q, type), 500), []);
    const onChange = (e, type) => {
        formik.setFieldValue(e.target.name, e.target.value);
        delayedQuery(e, type);
    };

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
                            onChange={(e) => {
                                formik.setFieldValue('oms_location_id', '');
                                formik.setFieldValue('oms_channel_id', '');
                                formik.setFieldValue('company', String(e.target.value));
                            }}
                            dataOptions={dataCompany}
                            selectClasses={classes.fieldInput}
                            formControlClasses={classes.selectControl}
                            fullWidth
                        />
                    </div>
                    <div>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                Location
                            </span>
                        </div>
                        <Select
                            name="oms_location_id"
                            value={formik.values.oms_location_id}
                            onChange={(e) => {
                                formik.setFieldValue('oms_channel_id', '');
                                formik.setFieldValue('oms_location_id', String(e.target.value));
                            }}
                            dataOptions={dataLocation && dataLocation.getLocationList && dataLocation.getLocationList.items}
                            error={!!(formik.touched.oms_location_id && formik.errors.oms_location_id)}
                            selectClasses={classes.fieldInput}
                            formControlClasses={classes.selectControl}
                            valueToMap="loc_id"
                            labelToMap="loc_name"
                            disabled={!formik.values.company}
                            loading={loadingLocation}
                            fullWidth
                        />
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                Channel
                            </span>
                        </div>
                        <Select
                            multiple
                            name="oms_channel_id"
                            value={formik.values.oms_channel_id}
                            onChange={formik.handleChange}
                            dataOptions={dataChannel && dataChannel.getPromotionChannelsByLocId}
                            error={!!(formik.touched.oms_channel_id && formik.errors.oms_channel_id)}
                            selectClasses={classes.fieldInputMultiple}
                            formControlClasses={classes.selectControl}
                            valueToMap="channel_id"
                            labelToMap="channel_name"
                            disabled={!formik.values.oms_location_id}
                            loading={loadingChannel}
                            fullWidth
                        />
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                Date From
                            </span>
                        </div>
                        <TextField
                            variant="outlined"
                            type="datetime-local"
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
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                Date To
                            </span>
                        </div>
                        <TextField
                            variant="outlined"
                            type="datetime-local"
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
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                Rule Type
                            </span>
                        </div>
                        <TextField
                            variant="outlined"
                            name="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInputFilter,
                            }}
                            fullWidth
                            error={!!(formik.touched.type && formik.errors.type)}
                            helperText={(formik.touched.type && formik.errors.type) || ''}
                        />
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={clsx(classes.label, classes.labelRequired)}>
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
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
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
                            name="max_promotion"
                            value={formik.values.max_promotion}
                            onChange={formik.handleChange}
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
                            dataOptions={[{ label: 'Or', value: 1 }, { label: 'And', value: 0 }]}
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
                                    name="all_product"
                                    checked={formik.values.all_product}
                                    onChange={(ev) => {
                                        formik.handleChange(ev);
                                        formik.setFieldValue('all_product_qty', 0);
                                    }}
                                />
                            )}
                            className={classes.controlLabel}
                            classes={{ root: classes.rootLabel }}
                            label="All Product QTY"
                        />
                    </div>
                    {formik.values.all_product
                        ? (
                            <div className={classes.gridAttribute}>
                                <div />
                                <TextField
                                    variant="outlined"
                                    name="all_product_qty"
                                    value={formik.values.all_product_qty}
                                    onChange={formik.handleChange}
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
                                    name="multiple_price"
                                    checked={formik.values.multiple_price}
                                    onChange={(ev) => {
                                        formik.handleChange(ev);
                                        formik.setFieldValue('single_total_price', 0);
                                    }}
                                />
                            )}
                            className={classes.controlLabel}
                            classes={{ root: classes.rootLabel }}
                            label="Multiple Total Price"
                        />
                    </div>
                    {formik.values.multiple_price
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
                                    name="single_total_price"
                                    value={formik.values.single_total_price}
                                    onChange={formik.handleChange}
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

                {formik.values.all_product
                    ? null : (
                        <div className={classes.content}>
                            <div className={classes.titleWithButton}>
                                <h5 className={classes.titleSmall}>Product Lines</h5>
                                <div>
                                    <Button
                                        className={classes.buttonCount}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            setPromotionItems(promotionItems + 1);
                                            formik.values.promotion_items.push({ sku: '', qty: '' });
                                        }}
                                    >
                                        <AddIcon />
                                    </Button>
                                    <Button
                                        className={classes.buttonCount}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            if (promotionItems > 0) {
                                                setPromotionItems(promotionItems - 1);
                                                formik.values.promotion_items.pop();
                                            }
                                        }}
                                    >
                                        <RemoveIcon />
                                    </Button>
                                </div>
                            </div>
                            <div className={classes.gridInputTitle} style={{ gridTemplateColumns: '70% 30%' }}>
                                <div
                                    className={classes.divLabel}
                                >
                                    <span className={clsx(classes.label, classes.labelRequired)}>
                                        SKU
                                    </span>
                                </div>
                                <div
                                    className={classes.divLabel}
                                >
                                    <span className={clsx(classes.label, classes.labelRequired)}>
                                        QTY
                                    </span>
                                </div>
                            </div>
                            {[...Array(promotionItems)].map((e, idx) => (
                                <div className={classes.gridInput} key={idx} style={{ gridTemplateColumns: '70% 30%' }}>
                                    <TextField
                                        onBlur={formik.handleBlur}
                                        onFocus={(ev) => {
                                            onChange(ev, 'product_lines');
                                        }}
                                        variant="outlined"
                                        name={`promotion_items[${idx}].sku`}
                                        value={formik.values.promotion_items[idx]?.sku}
                                        onChange={(ev) => {
                                            onChange(ev, 'product_lines');
                                        }}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            className: classes.fieldInputFilter,
                                        }}
                                        error={formik.touched.promotion_items
                                            && formik.touched.promotion_items[idx]?.sku
                                            && formik.values.promotion_items[idx]?.sku
                                            && !skuCheck.includes(formik.values.promotion_items[idx]?.sku)}
                                        helperText={formik.touched.promotion_items
                                            && formik.touched.promotion_items[idx]?.sku
                                            && formik.values.promotion_items[idx]?.sku
                                            && !skuCheck.includes(formik.values.promotion_items[idx]?.sku)
                                            ? 'SKU Product is not found' : ''}
                                    />
                                    <TextField
                                        variant="outlined"
                                        name={`promotion_items[${idx}].qty`}
                                        value={formik.values.promotion_items[idx]?.qty}
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
                                onClick={() => setPromotionFree(promotionFree + 1)}
                            >
                                <AddIcon />
                            </Button>
                            <Button
                                className={classes.buttonCount}
                                variant="contained"
                                color="secondary"
                                onClick={() => (promotionFree > 0 ? setPromotionFree(promotionFree - 1) : null)}
                            >
                                <RemoveIcon />
                            </Button>
                        </div>
                    </div>

                    {!formik.values.multiple_price
                        ? (
                            <>
                                <div className={classes.gridInputTitle} style={{ gridTemplateColumns: '70% 30%' }}>
                                    <div
                                        className={classes.divLabel}
                                    >
                                        <span className={clsx(classes.label, classes.labelRequired)}>
                                            SKU
                                        </span>
                                    </div>
                                    <div
                                        className={classes.divLabel}
                                    >
                                        <span className={clsx(classes.label, classes.labelRequired)}>
                                            QTY
                                        </span>
                                    </div>
                                </div>
                                {[...Array(promotionFree)].map((e, idx) => (
                                    <div className={classes.gridInput} key={idx} style={{ gridTemplateColumns: '70% 30%' }}>
                                        <TextField
                                            onBlur={formik.handleBlur}
                                            onFocus={(ev) => {
                                                onChange(ev, 'product_lines');
                                            }}
                                            variant="outlined"
                                            name={`promotion_free_items[${idx}].sku`}
                                            value={formik.values?.promotion_free_items[idx]?.sku}
                                            onChange={(ev) => {
                                                onChange(ev, '');
                                            }}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                className: classes.fieldInputFilter,
                                            }}
                                            error={formik.touched.promotion_free_items
                                            && formik.touched.promotion_free_items[idx]?.sku
                                            && formik.values.promotion_free_items[idx]?.sku
                                            && !skuCheck.includes(formik.values.promotion_free_items[idx]?.sku)}
                                            helperText={formik.touched.promotion_free_items
                                            && formik.touched.promotion_free_items[idx]?.sku
                                            && formik.values.promotion_free_items[idx]?.sku
                                            && !skuCheck.includes(formik.values.promotion_free_items[idx]?.sku)
                                                ? 'SKU Product is not found' : ''}
                                        />
                                        <TextField
                                            variant="outlined"
                                            name={`promotion_free_items[${idx}].qty`}
                                            value={formik.values?.promotion_free_items[idx]?.qty}
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
                                        <span className={clsx(classes.label, classes.labelRequired)}>
                                            SKU
                                        </span>
                                    </div>
                                    <div
                                        className={classes.divLabel}
                                    >
                                        <span className={clsx(classes.label, classes.labelRequired)}>
                                            QTY
                                        </span>
                                    </div>
                                </div>
                                {[...Array(promotionFree)].map((e, idx) => (
                                    <div className={classes.gridInput} key={idx} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                                        <TextField
                                            variant="outlined"
                                            name={`promotion_free_items[${idx}].min_total_price`}
                                            value={formik.values?.promotion_free_items[idx]?.min_total_price}
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
                                            name={`promotion_free_items[${idx}].max_total_price`}
                                            value={formik.values?.promotion_free_items[idx]?.max_total_price}
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
                                            onBlur={formik.handleBlur}
                                            onFocus={(ev) => {
                                                onChange(ev, '');
                                            }}
                                            variant="outlined"
                                            name={`promotion_free_items[${idx}].sku`}
                                            value={formik.values?.promotion_free_items[idx]?.sku}
                                            onChange={(ev) => {
                                                onChange(ev, '');
                                            }}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                className: classes.fieldInputFilter,
                                            }}
                                            error={formik.touched.promotion_free_items
                                            && formik.touched.promotion_free_items[idx]?.sku
                                            && formik.values.promotion_free_items[idx]?.sku
                                            && !skuCheck.includes(formik.values.promotion_free_items[idx]?.sku)}
                                            helperText={formik.touched.promotion_free_items
                                            && formik.touched.promotion_free_items[idx]?.sku
                                            && formik.values.promotion_free_items[idx]?.sku
                                            && !skuCheck.includes(formik.values.promotion_free_items[idx]?.sku)
                                                ? 'SKU Product is not found' : ''}
                                        />
                                        <TextField
                                            variant="outlined"
                                            name={`promotion_free_items[${idx}].qty`}
                                            value={formik.values?.promotion_free_items[idx]?.qty}
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
                    {Object.keys(formik.errors).length !== 0
                        && (
                            <div className={classes.errorHtml}>
                                <div style={{ paddingLeft: 5 }}>Please make sure all required field is filled!</div>
                            </div>
                        )}
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ProductListEditContent;
