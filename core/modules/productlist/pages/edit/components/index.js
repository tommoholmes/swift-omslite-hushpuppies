/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import useStyles from '@modules/productlist/pages/edit/components/style';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import Select from '@common_select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DropFile from '@common_dropfile';

const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#7AA12E',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#7AA12E',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: '#F9E5E4',
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => (
    <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
        }}
        {...props}
    />
));

const AttributeComponents = ({
    formik, handleDropFile, attribute_code, attribute_options, images,
    is_readonly, frontend_input,
}) => {
    const classes = useStyles();
    switch (frontend_input) {
    case 'weight':
    case 'price':
    case 'text':
        return (
            <TextField
                name={attribute_code}
                disabled={is_readonly}
                className={classes.fieldRoot}
                variant="outlined"
                value={formik.values[attribute_code]}
                onChange={formik.handleChange}
                InputProps={{
                    className: clsx(classes.fieldInput, is_readonly && 'disabled'),
                }}
                error={!!(formik.touched[attribute_code] && formik.errors[attribute_code])}
                helperText={(formik.touched[attribute_code] && formik.errors[attribute_code]) || ''}
                fullWidth
            />
        );
    case 'textarea':
        return (
            <TextField
                name={attribute_code}
                disabled={is_readonly}
                className={classes.fieldRoot}
                variant="outlined"
                value={formik.values[attribute_code]}
                onChange={formik.handleChange}
                InputProps={{
                    className: clsx(classes.fieldRootNote, is_readonly && 'disabled'),
                }}
                error={!!(formik.touched[attribute_code] && formik.errors[attribute_code])}
                multiline
                rows={5}
                fullWidth
            />
        );
    case 'select':
        return (
            <Select
                name={attribute_code}
                disabled={is_readonly}
                value={formik.values[attribute_code]}
                onChange={formik.handleChange}
                dataOptions={attribute_options}
                error={!!(formik.touched[attribute_code] && formik.errors[attribute_code])}
                selectClasses={classes.fieldInput}
                formControlClasses={classes.selectControl}
                enableEmpty={false}
            />
        );
    case 'multiselect':
        return (
            <Autocomplete
                multiple
                className={classes.autocompleteRoot}
                name={attribute_code}
                disabled={is_readonly}
                value={typeof formik.values[attribute_code] === 'object' ? formik.values[attribute_code]
                    : [formik.values[attribute_code]]}
                onChange={(e) => formik.setFieldValue(attribute_code, e)}
                primaryKey="value"
                labelKey="label"
                options={attribute_options}
                error={!!(formik.touched[attribute_code] && formik.errors[attribute_code])}
                helperText={(formik.touched[attribute_code] && formik.errors[attribute_code]) || ''}
                fullWidth
            />
        );
    case 'date':
        return (
            <TextField
                name={attribute_code}
                disabled={is_readonly}
                className={classes.fieldRoot}
                variant="outlined"
                type="date"
                value={formik.values[attribute_code]}
                onChange={formik.handleChange}
                InputProps={{
                    className: clsx(classes.fieldInput, is_readonly && 'disabled'),
                }}
                error={!!(formik.touched[attribute_code] && formik.errors[attribute_code])}
                fullWidth
            />
        );
    case 'boolean':
        return (
            <FormControlLabel
                control={(
                    <IOSSwitch
                        name={attribute_code}
                        disabled={is_readonly}
                        checked={formik.values[attribute_code]}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                )}
                label={formik.values[attribute_code] ? 'Yes' : 'No'}
            />
        );
    case 'media_image':
        return (
            <div>
                <DropFile
                    formatFile=".jpg, .jpeg, .png, .gif"
                    getBase64={handleDropFile}
                />
                {images && images.length
                    ? (
                        <>
                            <br />
                            {images.map((image) => (
                                <img className={classes.img} key={image} src={image} alt="media_img" />
                            ))}
                        </>
                    )
                    : null}
            </div>
        );
    default:
        return null;
    }
};

const ProductListEditContent = (props) => {
    const {
        productDetail, attribute_set_id, onChangeAttribute, formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const [expanded, setExpanded] = React.useState('');
    const [selected, setSelected] = React.useState(productDetail.vendor_price?.map((vend) => (vend.price[0].location.loc_id)));
    const handleChangeAccordion = (e) => (event, isExpanded) => {
        setExpanded(isExpanded ? e : false);
    };
    const groupDetails = productDetail.groups.find((obj) => obj.attribute_group_code === 'product-details');

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
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Attribute Set
                            </span>
                        </div>
                        <Select
                            value={attribute_set_id}
                            onChange={(e) => onChangeAttribute(e)}
                            dataOptions={productDetail.attribute_set_options}
                            selectClasses={classes.fieldInput}
                            formControlClasses={classes.selectControl}
                            enableEmpty={false}
                        />
                    </div>
                    {groupDetails.attributes.map((att, attIdx) => (
                        <div className={classes.gridAttribute} key={attIdx}>
                            <div
                                className={classes.divLabel}
                            >
                                <span className={clsx(classes.label, att.is_required && classes.labelRequired)}>
                                    {att.frontend_label}

                                </span>
                            </div>
                            <AttributeComponents {...props} {...att} />
                        </div>
                    ))}
                </div>
                {productDetail.groups.map((attGroup, attGroupIdx) => (attGroup.attribute_group_code !== 'product-details')
                    && (
                        <div className={classes.content} key={attGroupIdx}>
                            <Accordion
                                elevation={0}
                                expanded={expanded === attGroup.attribute_group_code}
                                onChange={handleChangeAccordion(attGroup.attribute_group_code)}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                    <h5 className={classes.title}>
                                        {attGroup.attribute_group_name}
                                        {attGroup.attributes.find((att) => att.is_required)
                                            && <span className={classes.asterisk}>*</span>}
                                    </h5>
                                </AccordionSummary>
                                <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                    {attGroup.attributes.map((att, attIdx) => (
                                        <div className={classes.gridAttribute} key={attIdx}>
                                            <div
                                                className={classes.divLabel}
                                            >
                                                <span className={clsx(classes.label, att.is_required && classes.labelRequired)}>
                                                    {att.frontend_label}

                                                </span>
                                            </div>
                                            <AttributeComponents {...props} {...att} />
                                        </div>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))}
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

                <div className={classes.content}>
                    <Accordion
                        elevation={0}
                        expanded={expanded === 'stocklist'}
                        onChange={handleChangeAccordion('stocklist')}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                            <h2 className={classes.title}>Stock List</h2>

                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                            <div className={classes.formField}>
                                <table className={classes.table}>
                                    <tbody>
                                        <tr className={classes.tr}>
                                            <th className={classes.th}>Location</th>
                                            <th className={classes.th}>Qty Total</th>
                                            <th className={classes.th}>Qty Reserved</th>
                                            <th className={classes.th}>Qty Saleable</th>
                                        </tr>
                                        {productDetail.sourcing.map((e, i) => (
                                            <tr key={i}>
                                                <td className={classes.td}>{e.loc_name}</td>
                                                <td className={classes.td}>{e.qty_total}</td>
                                                <td className={classes.td}>{e.qty_reserved}</td>
                                                <td className={classes.td}>{e.qty_saleable}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>

                {productDetail.vendor_price && productDetail.vendor_price.length
                    ? (
                        <div className={classes.content}>
                            <Accordion
                                elevation={0}
                                expanded={expanded === 'vendor_price'}
                                onChange={handleChangeAccordion('vendor_price')}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                    <h2 className={classes.title}>Vendor Price List</h2>

                                </AccordionSummary>
                                <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                    <div className={classes.formField}>
                                        <table className={classes.table}>
                                            <tbody>
                                                <tr className={classes.tr}>
                                                    <th className={classes.th}>Vendor</th>
                                                    <th className={classes.th}>Location</th>
                                                    <th className={classes.th}>Price</th>
                                                </tr>
                                                {productDetail.vendor_price.map((e, i) => {
                                                    const optionsVendor = e.price.map((p) => ({
                                                        label: p.location.loc_name,
                                                        value: p.location.loc_id,
                                                    }));
                                                    return (
                                                        <tr key={i}>
                                                            <td className={classes.td}>{e.vendor.company_name}</td>
                                                            <td className={classes.td}>
                                                                <Select
                                                                    value={selected[i]}
                                                                    onChange={(ev) => {
                                                                        const temp = [...selected];
                                                                        temp[i] = Number(ev.target.value);
                                                                        setSelected(temp);
                                                                    }}
                                                                    dataOptions={optionsVendor}
                                                                    enableEmpty={false}
                                                                />
                                                            </td>
                                                            <td className={classes.td}>
                                                                <span style={{ fontWeight: 'bold' }}>Price :</span>
                                                                <span>
                                                                    {
                                                                ` IDR${e.price.find((vp) => (vp.location.loc_id === selected[i]))?.price}`
                                                                    }
                                                                </span>
                                                                <br />
                                                                <span style={{ fontWeight: 'bold' }}>Special Price :</span>
                                                                <span>
                                                                    {
                                                                    ` IDR${e.price.find((vp) => (vp.location.loc_id === selected[i]))?.special_price}`
                                                                    }
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ) : null}

            </Paper>
        </>
    );
};

export default ProductListEditContent;
