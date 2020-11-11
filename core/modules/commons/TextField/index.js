import TextField from '@material-ui/core/TextField';

const CustomTextField = ({
    placeholder = '',
    onChange = () => {},
    value = '',
    variant = 'standard',
    type = '',
    ...other
}) => (
    <TextField
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        variant={variant}
        {...other}
    />
);

export default CustomTextField;
