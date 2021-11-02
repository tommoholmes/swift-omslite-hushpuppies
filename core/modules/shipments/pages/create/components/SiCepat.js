import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import useStyles from '@modules/shipments/pages/create/components/style';
import { optionsYesNo } from '@modules/shipments/helpers';

const SiCepat = (props) => {
    const {
        expanded, handleChangeShippindChild, setFieldValue, values, handleChange,
    } = props;
    const classes = useStyles();

    return (
        <Accordion elevation={0} expanded={expanded === 'sicepat'} onChange={handleChangeShippindChild('sicepat')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                <h2 className={classes.title}>si cepat</h2>
            </AccordionSummary>
            <AccordionDetails>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Enabled</span>
                    </div>
                    <Autocomplete
                        getOptionSelected={(opt, val) => opt.id === val.id}
                        className={classes.autocompleteRoot}
                        value={values.sicepat_active}
                        onChange={(e) => setFieldValue('sicepat_active', e ?? optionsYesNo[0])}
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
                        value={values.sicepat_use_sandbox}
                        onChange={(e) => setFieldValue('sicepat_use_sandbox', e ?? optionsYesNo[0])}
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
                        name="sicepat_production_api_url"
                        value={values.sicepat_production_api_url}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>sandbox URL</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="sicepat_sandbox_api_url"
                        value={values.sicepat_sandbox_api_url}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Production API Key</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="sicepat_production_api_key"
                        value={values.sicepat_production_api_key}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Sandbox API Key</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="sicepat_sandbox_api_key"
                        value={values.sicepat_sandbox_api_key}
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

export default SiCepat;
