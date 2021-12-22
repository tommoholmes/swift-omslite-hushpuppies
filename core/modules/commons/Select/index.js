import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        marginLeft: 0,
        minWidth: 'calc(100% - 30px)',
    },
    select: {
        height: 31,
    },
    formControlFullWidth: {
        margin: theme.spacing(1),
        marginLeft: 0,
        width: '100%',
    },
    root: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
    },
}));

const CustomTextField = ({
    variant = 'outlined',
    value,
    onChange = () => { },
    inputProps,
    disabled,
    dataOptions = [],
    enableEmpty = true,
    emptyText = 'Please Select',
    formControlClasses = null,
    selectClasses = null,
    rootClasses = null,
    valueToMap = 'value',
    labelToMap = 'label',
    error = false,
    errorMessage = 'This is a Required field.',
    fullWidth = false,
    loading = false,
    multiple = false,
    ...other
}) => {
    const classes = useStyles();
    return (
        <FormControl
            variant={variant}
            className={formControlClasses || fullWidth ? classes.formControlFullWidth
                : classes.formControl}
            error={error}
        >
            <Select
                native
                className={selectClasses || classes.select}
                classes={{ root: rootClasses || classes.root }}
                value={value}
                onChange={onChange}
                inputProps={inputProps}
                disabled={disabled || loading}
                multiple={multiple}
                {...other}
            >
                {loading ? <option aria-label="None" value="">Loading...</option>
                    : (
                        <>
                            {dataOptions.length === 0 && multiple ? <option aria-label="None" value="">{emptyText}</option> : null}
                            {enableEmpty && !multiple
                    && <option aria-label="None" value="">{emptyText}</option>}
                            {dataOptions.map((option) => (
                                <>
                                    <option value={option[valueToMap]}>{option[labelToMap]}</option>
                                </>

                            ))}
                        </>
                    )}
            </Select>
            {error
                && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};

export default CustomTextField;
