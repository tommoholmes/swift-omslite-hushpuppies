import TextField from '@material-ui/core/TextField';

const CustomTextField = ({
    variant = 'standard',
    ...other
}) => (
    <TextField
        variant={variant}
        {...other}
    />
);

export default CustomTextField;
