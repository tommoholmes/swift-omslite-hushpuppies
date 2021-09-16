/* eslint-disable react/jsx-no-duplicate-props */
import TextField from '@material-ui/core/TextField';

const CustomTextField = ({
    variant = 'standard',
    InputProps,
    inputProps,
    disabled,
    ...other
}) => (
    <TextField
        disabled={disabled}
        variant={variant}
        InputProps={{
            ...InputProps,
            autoComplete: 'no-autocomplete',
        }}
        inputProps={{
            ...inputProps,
            autoComplete: 'no-autocomplete',
        }}
        {...other}
    />
);

export default CustomTextField;
