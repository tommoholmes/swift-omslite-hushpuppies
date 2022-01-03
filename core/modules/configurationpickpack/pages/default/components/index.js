/* eslint-disable no-lone-blocks */
import React from 'react';
import Button from '@common_button';
import Select from '@common_select';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import useStyles from '@modules/configurationpickpack/pages/default/components/style';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@common_textfield';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ManageRmaEditContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState({
        wave: true,
        batch: true,
    });

    const options = [
        { value: '0', label: 'No' },
        { value: '1', label: 'Yes' },
    ];

    const optionsSorting = [
        { value: 'single_item', label: 'Single Item' },
        { value: 'multiple_item', label: 'Multiple Item' },
    ];

    const handleChangeAccordion = (num) => {
        if (num === 1) {
            setExpanded({
                ...expanded,
                wave: !expanded.wave,
            });
        } else {
            setExpanded({
                ...expanded,
                batch: !expanded.batch,
            });
        }
    };

    return (
        <>
            <h2 className={classes.titleTop}>Pick Pack Configuration</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <Accordion
                        elevation={4}
                        expanded={expanded.wave}
                        onChange={() => handleChangeAccordion(1)}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                            <h2 className={classes.title}>
                                Pick by Wave
                            </h2>
                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                            <div className={classes.content}>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>Enable</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_wave_enable.value"
                                        value={formik.values.swiftoms_pickpack_wave_enable.value}
                                        onChange={formik.handleChange}
                                        dataOptions={options}
                                        error={!!(formik.swiftoms_pickpack_wave_enable
                                        && formik.swiftoms_pickpack_wave_enable)}
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_wave_enable.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_wave_enable.is_default"
                                                    checked={formik.values.swiftoms_pickpack_wave_enable.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label="Is Use System Value"
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_wave_enable.is_default"
                                                checked={formik.values.swiftoms_pickpack_wave_enable.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label="Is Use System Value"
                                    />
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>Number of Slots per Picker</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="swiftoms_pickpack_wave_slots_per_picker.value"
                                        value={formik.values.swiftoms_pickpack_wave_slots_per_picker.value}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.swiftoms_pickpack_wave_slots_per_picker
                                        && formik.errors.swiftoms_pickpack_wave_slots_per_picker)}
                                        helperText={(formik.touched.swiftoms_pickpack_wave_slots_per_picker
                                        && formik.errors.swiftoms_pickpack_wave_slots_per_picker) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        fullWidth
                                    />
                                </div>

                                <div style={{ height: 15 }} />

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>Number of Items per Slots</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="swiftoms_pickpack_wave_items_per_slot.value"
                                        value={formik.values.swiftoms_pickpack_wave_items_per_slot.value}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.swiftoms_pickpack_wave_items_per_slot
                                        && formik.errors.swiftoms_pickpack_wave_items_per_slot)}
                                        helperText={(formik.touched.swiftoms_pickpack_wave_items_per_slot
                                        && formik.errors.swiftoms_pickpack_wave_items_per_slot) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_wave_items_per_slot.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_wave_items_per_slot.is_default"
                                                    checked={formik.values.swiftoms_pickpack_wave_items_per_slot.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label="Is Use System Value"
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_wave_items_per_slot.is_default"
                                                checked={formik.values.swiftoms_pickpack_wave_items_per_slot.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label="Is Use System Value"
                                    />
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>Allow Confirm Pick Without Scan Barcode</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_wave_allow_manual_confirm_pick.value"
                                        value={formik.values.swiftoms_pickpack_wave_allow_manual_confirm_pick.value}
                                        onChange={formik.handleChange}
                                        dataOptions={options}
                                        error={!!(formik.swiftoms_pickpack_wave_allow_manual_confirm_pick
                                        && formik.swiftoms_pickpack_wave_allow_manual_confirm_pick)}
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_wave_allow_manual_confirm_pick.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_wave_allow_manual_confirm_pick.is_default"
                                                    checked={formik.values.swiftoms_pickpack_wave_allow_manual_confirm_pick.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label="Is Use System Value"
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_wave_allow_manual_confirm_pick.is_default"
                                                checked={formik.values.swiftoms_pickpack_wave_allow_manual_confirm_pick.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label="Is Use System Value"
                                    />
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>Use Camera To Scan Barcode</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_wave_use_camera_to_scan.value"
                                        value={formik.values.swiftoms_pickpack_wave_use_camera_to_scan.value}
                                        onChange={formik.handleChange}
                                        dataOptions={options}
                                        error={!!(formik.swiftoms_pickpack_wave_use_camera_to_scan
                                        && formik.swiftoms_pickpack_wave_use_camera_to_scan)}
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_wave_use_camera_to_scan.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_wave_use_camera_to_scan.is_default"
                                                    checked={formik.values.swiftoms_pickpack_wave_use_camera_to_scan.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label="Is Use System Value"
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_wave_use_camera_to_scan.is_default"
                                                checked={formik.values.swiftoms_pickpack_wave_use_camera_to_scan.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label="Is Use System Value"
                                    />
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion
                        elevation={4}
                        expanded={expanded.batch}
                        onChange={() => handleChangeAccordion(2)}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                            <h2 className={classes.title}>
                                Pick by Batch
                            </h2>
                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                            <div className={classes.content}>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>Enable</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_batch_enable.value"
                                        value={formik.values.swiftoms_pickpack_batch_enable.value}
                                        onChange={formik.handleChange}
                                        dataOptions={options}
                                        error={!!(formik.swiftoms_pickpack_batch_enable
                                        && formik.swiftoms_pickpack_batch_enable)}
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_batch_enable.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_batch_enable.is_default"
                                                    checked={formik.values.swiftoms_pickpack_batch_enable.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label="Is Use System Value"
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_batch_enable.is_default"
                                                checked={formik.values.swiftoms_pickpack_batch_enable.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label="Is Use System Value"
                                    />
                                </div>
                                <div style={{ height: 5 }} />
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>Number of Items per Slots</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="swiftoms_pickpack_batch_items_per_slot.value"
                                        value={formik.values.swiftoms_pickpack_batch_items_per_slot.value}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.swiftoms_pickpack_batch_items_per_slot
                                        && formik.errors.swiftoms_pickpack_batch_items_per_slot)}
                                        helperText={(formik.touched.swiftoms_pickpack_batch_items_per_slot
                                        && formik.errors.swiftoms_pickpack_batch_items_per_slot) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_batch_items_per_slot.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_batch_items_per_slot.is_default"
                                                    checked={formik.values.swiftoms_pickpack_batch_items_per_slot.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label="Is Use System Value"
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_batch_items_per_slot.is_default"
                                                checked={formik.values.swiftoms_pickpack_batch_items_per_slot.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label="Is Use System Value"
                                    />
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>Sorting Method</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_batch_sorting_method.value"
                                        value={formik.values.swiftoms_pickpack_batch_sorting_method.value}
                                        onChange={formik.handleChange}
                                        dataOptions={optionsSorting}
                                        error={!!(formik.swiftoms_pickpack_batch_sorting_method
                                        && formik.swiftoms_pickpack_batch_sorting_method)}
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_batch_sorting_method.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_batch_sorting_method.is_default"
                                                    checked={formik.values.swiftoms_pickpack_batch_sorting_method.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label="Is Use System Value"
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_batch_sorting_method.is_default"
                                                checked={formik.values.swiftoms_pickpack_batch_sorting_method.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label="Is Use System Value"
                                    />
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>Allow Confirm Pick Without Scan Barcode</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_batch_allow_manual_confirm_pick.value"
                                        value={formik.values.swiftoms_pickpack_batch_allow_manual_confirm_pick.value}
                                        onChange={formik.handleChange}
                                        dataOptions={options}
                                        error={!!(formik.swiftoms_pickpack_batch_allow_manual_confirm_pick
                                        && formik.swiftoms_pickpack_batch_allow_manual_confirm_pick)}
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_batch_allow_manual_confirm_pick.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_batch_allow_manual_confirm_pick.is_default"
                                                    checked={formik.values.swiftoms_pickpack_batch_allow_manual_confirm_pick.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label="Is Use System Value"
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_batch_allow_manual_confirm_pick.is_default"
                                                checked={formik.values.swiftoms_pickpack_batch_allow_manual_confirm_pick.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label="Is Use System Value"
                                    />
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>Use Camera To Scan Barcode</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_batch_use_camera_to_scan.value"
                                        value={formik.values.swiftoms_pickpack_batch_use_camera_to_scan.value}
                                        onChange={formik.handleChange}
                                        dataOptions={options}
                                        error={!!(formik.swiftoms_pickpack_batch_use_camera_to_scan
                                        && formik.swiftoms_pickpack_batch_use_camera_to_scan)}
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_batch_use_camera_to_scan.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_batch_use_camera_to_scan.is_default"
                                                    checked={formik.values.swiftoms_pickpack_batch_use_camera_to_scan.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label="Is Use System Value"
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_batch_use_camera_to_scan.is_default"
                                                checked={formik.values.swiftoms_pickpack_batch_use_camera_to_scan.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label="Is Use System Value"
                                    />
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className={classes.formFieldButton}>
                        <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                            Submit
                        </Button>
                    </div>
                </div>
            </Paper>
            <div style={{ height: 30 }} />
        </>
    );
};

export default ManageRmaEditContent;
