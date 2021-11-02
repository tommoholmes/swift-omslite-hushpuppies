import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import useStyles from '@modules/shipments/pages/create/components/style';
import { optionsYesNo } from '@modules/shipments/helpers';

const ShipperID = (props) => {
    const {
        expanded, handleChangeShippindChild, setFieldValue, values, handleChange,
    } = props;
    const classes = useStyles();

    return (
        <Accordion elevation={0} expanded={expanded === 'shipperid'} onChange={handleChangeShippindChild('shipperid')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                <h2 className={classes.title}>shipper id</h2>
            </AccordionSummary>
            <AccordionDetails>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Enabled</span>
                    </div>
                    <Autocomplete
                        getOptionSelected={(opt, val) => opt.id === val.id}
                        className={classes.autocompleteRoot}
                        value={values.shipperid_active}
                        onChange={(e) => setFieldValue('shipperid_active', e ?? optionsYesNo[0])}
                        options={optionsYesNo}
                        primaryKey="id"
                        labelKey="name"
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Sandbox Mode</span>
                    </div>
                    <Autocomplete
                        getOptionSelected={(opt, val) => opt.id === val.id}
                        className={classes.autocompleteRoot}
                        value={values.shipperid_use_sandbox}
                        onChange={(e) => setFieldValue('shipperid_use_sandbox', e ?? optionsYesNo[0])}
                        options={optionsYesNo}
                        primaryKey="id"
                        labelKey="name"
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Production URL</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="shipperid_production_url"
                        value={values.shipperid_production_url}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>API Key</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="shipperid_api_key"
                        value={values.shipperid_api_key}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Dimension Calculation</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="shipperid_dimentional_cal"
                        value={values.shipperid_dimentional_cal}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Allow Free Shipping</span>
                    </div>
                    <Autocomplete
                        getOptionSelected={(opt, val) => opt.id === val.id}
                        className={classes.autocompleteRoot}
                        value={values.shipperid_allow_free}
                        onChange={(e) => setFieldValue('shipperid_allow_free', e ?? optionsYesNo[0])}
                        options={optionsYesNo}
                        primaryKey="id"
                        labelKey="name"
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Minimum Order Amount For Free Shipping</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="shipperid_min_freeshipping_amount"
                        value={values.shipperid_min_freeshipping_amount}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Auto Booking</span>
                    </div>
                    <Autocomplete
                        getOptionSelected={(opt, val) => opt.id === val.id}
                        className={classes.autocompleteRoot}
                        value={values.shipperid_auto_booking}
                        onChange={(e) => setFieldValue('shipperid_auto_booking', e ?? optionsYesNo[0])}
                        options={optionsYesNo}
                        primaryKey="id"
                        labelKey="name"
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Insurance</span>
                    </div>
                    <Autocomplete
                        getOptionSelected={(opt, val) => opt.id === val.id}
                        className={classes.autocompleteRoot}
                        value={values.shipperid_insurance}
                        onChange={(e) => setFieldValue('shipperid_insurance', e ?? optionsYesNo[0])}
                        options={optionsYesNo}
                        primaryKey="id"
                        labelKey="name"
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default ShipperID;
