import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    fieldInput: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
    },
    green: {
        color: 'white',
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 20,
    },
    red: {
        color: 'white',
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 20,
    },
}));

export default useStyles;
