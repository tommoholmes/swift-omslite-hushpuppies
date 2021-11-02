import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import useStyles from '@modules/shipments/pages/create/components/style';
import { optionsYesNo } from '@modules/shipments/helpers';

const SapShipment = (props) => {
    const {
        expanded, handleChangeShippindChild, setFieldValue, values, handleChange,
    } = props;
    const classes = useStyles();

    return (
        <Accordion elevation={0} expanded={expanded === 'sapshipment'} onChange={handleChangeShippindChild('sapshipment')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                <h2 className={classes.title}>sap shipment</h2>
            </AccordionSummary>
            <AccordionDetails>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Enabled SAP COD</span>
                    </div>
                    <Autocomplete
                        getOptionSelected={(opt, val) => opt.id === val.id}
                        className={classes.autocompleteRoot}
                        value={values.sapcod_active}
                        onChange={(e) => setFieldValue('sapcod_active', e ?? optionsYesNo[0])}
                        options={optionsYesNo}
                        primaryKey="id"
                        labelKey="name"
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Enabled SAP Express</span>
                    </div>
                    <Autocomplete
                        getOptionSelected={(opt, val) => opt.id === val.id}
                        className={classes.autocompleteRoot}
                        value={values.sapexpress_active}
                        onChange={(e) => setFieldValue('sapexpress_active', e ?? optionsYesNo[0])}
                        options={optionsYesNo}
                        primaryKey="id"
                        labelKey="name"
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Global Key</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="sapcod_api_global_key"
                        value={values.sapcod_api_global_key}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Sandbox Mode</span>
                    </div>
                    <Autocomplete
                        getOptionSelected={(opt, val) => opt.id === val.id}
                        className={classes.autocompleteRoot}
                        value={values.sapcod_use_sandbox}
                        onChange={(e) => setFieldValue('sapcod_use_sandbox', e ?? optionsYesNo[0])}
                        options={optionsYesNo}
                        primaryKey="id"
                        labelKey="name"
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Post API Key</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="sapcod_sapcod_key"
                        value={values.sapcod_sapcod_key}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Company Code</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="sapcod_customer_code"
                        value={values.sapcod_customer_code}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default SapShipment;
