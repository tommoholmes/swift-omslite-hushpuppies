import { makeStyles } from '@material-ui/core/styles';

const colorText = '#536777';
const iconFont = '#435179';

const useStyles = makeStyles(() => ({
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        height: 56,
        borderRadius: 4,
        '& .MuiInputBase-input': {
            padding: '18.5px 14px',
        },
    },
    statusRow: {
        display: 'flex',
        color: iconFont,
        fontWeight: 600,
        alignItems: 'center',
        '&.unbold': {
            fontWeight: 'unset',
        },
    },
    statusIcon: {
        width: 36,
        height: 'auto',
        marginRight: 12,
    },
    loading: {
        display: 'flex',
        color: iconFont,
        fontWeight: 600,
        justifyContent: 'center',
        paddingTop: 20,
    },
}));

export default useStyles;
