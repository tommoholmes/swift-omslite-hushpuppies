import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        marginLeft: 0,
        minWidth: 'calc(100% - 30px)',
    },
    select: {
        height: 31,
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
    ...other
}) => {
    const classes = useStyles();
    return (
        <FormControl variant={variant} className={formControlClasses || classes.formControl}>
            <Select
                native
                className={selectClasses || classes.select}
                classes={{ root: rootClasses || classes.root }}
                value={value}
                onChange={onChange}
                inputProps={inputProps}
                disabled={disabled}
                {...other}
            >
                {enableEmpty
                    && <option aria-label="None" value="">{emptyText}</option>}
                {dataOptions.map((option) => (
                    <>
                        <option value={option[valueToMap]}>{option[labelToMap]}</option>
                    </>

                ))}
            </Select>
        </FormControl>
    );
};

export default CustomTextField;
