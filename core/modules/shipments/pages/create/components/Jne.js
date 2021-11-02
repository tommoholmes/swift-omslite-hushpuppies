import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import useStyles from '@modules/shipments/pages/create/components/style';
import { optionsYesNo } from '@modules/shipments/helpers';

const Jne = (props) => {
    const {
        expanded, handleChangeShippindChild, setFieldValue, values, handleChange,
    } = props;
    const classes = useStyles();

    return (
        <Accordion elevation={0} expanded={expanded === 'jne'} onChange={handleChangeShippindChild('jne')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                <h2 className={classes.title}>jne</h2>
            </AccordionSummary>
            <AccordionDetails>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Enabled</span>
                    </div>
                    <Autocomplete
                        getOptionSelected={(opt, val) => opt.id === val.id}
                        className={classes.autocompleteRoot}
                        value={values.jneshipping_active}
                        onChange={(e) => setFieldValue('jneshipping_active', e ?? optionsYesNo[0])}
                        options={optionsYesNo}
                        primaryKey="id"
                        labelKey="name"
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Price</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="jneshipping_price"
                        value={values.jneshipping_price}
                        onChange={(e) => setFieldValue('jneshipping_price', e.target.value)}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>JNE URL</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="jneshipping_jne_url"
                        value={values.jneshipping_jne_url}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>JNE URL Tracking</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="jneshipping_jne_url_tracking"
                        value={values.jneshipping_jne_url_tracking}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>Username</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="jneshipping_jne_username"
                        value={values.jneshipping_jne_username}
                        onChange={handleChange}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>API KEY</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="jneshipping_jne_key"
                        value={values.jneshipping_jne_key}
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

export default Jne;
