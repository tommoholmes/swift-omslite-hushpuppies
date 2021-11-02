import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import useStyles from '@modules/shipments/pages/create/components/style';
import { optionsYesNo } from '@modules/shipments/helpers';

const GoSend = (props) => {
    const {
        expanded, handleChangeShippindChild, setFieldValue, values, handleChange,
    } = props;
    const classes = useStyles();

    return (
        <Accordion elevation={0} expanded={expanded === 'grabexpress'} onChange={handleChangeShippindChild('grabexpress')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                <h2 className={classes.title}>grab express</h2>
            </AccordionSummary>
            <AccordionDetails>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Enabled</span>
                    </div>
                    <Autocomplete
                        getOptionSelected={(opt, val) => opt.id === val.id}
                        className={classes.autocompleteRoot}
                        value={values.grabexpress_active}
                        onChange={(e) => setFieldValue('grabexpress_active', e ?? optionsYesNo[0])}
                        options={optionsYesNo}
                        primaryKey="id"
                        labelKey="name"
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Is Production</span>
                    </div>
                    <Autocomplete
                        getOptionSelected={(opt, val) => opt.id === val.id}
                        className={classes.autocompleteRoot}
                        value={values.grabexpress_is_production}
                        onChange={(e) => setFieldValue('grabexpress_is_production', e ?? optionsYesNo[0])}
                        options={optionsYesNo}
                        primaryKey="id"
                        labelKey="name"
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Cient ID</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="grabexpress_client_id"
                        value={values.grabexpress_client_id}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Client Secret</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="grabexpress_client_secret"
                        value={values.grabexpress_client_secret}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Start Time</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="grabexpress_start_time"
                        value={values.grabexpress_start_time}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>End Time</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="grabexpress_end_time"
                        value={values.grabexpress_end_time}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Payment Type</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="grabexpress_payment_type"
                        value={values.grabexpress_payment_type}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>SMS Enable</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="grabexpress_sms_enabled"
                        value={values.grabexpress_sms_enabled}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Sender Instruction</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="grabexpress_sender_instruction"
                        value={values.grabexpress_sender_instruction}
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

export default GoSend;
