import { makeStyles } from '@material-ui/core/styles';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';
const colorOrange = '#FF962C';
const colorPurple = '#BE1F93';
const colorBlue = '#4A87FE';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
        position: 'relative',
    },
    content: {
        padding: '15px 25px',
        background: '#ffffff',
        borderRadius: 16,
        paddingTop: 25,
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 42,
        marginBottom: 6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
        },
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        display: 'flex',
        alignItems: 'center',
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -9,
            right: -9,
            color: colorPurple,
            fontSize: 20,
        },
    },
    fieldRoot: {
        verticalAlign: 'middle',
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            height: 0,
        },
    },
    titleSmall: {
        paddingBottom: 10,
        borderColor: colorGray,
        fontFamily: font,
        color: colorGray,
        fontSize: 14,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
    },
    gridMp: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
    },
    mp: {
        textAlign: 'center',
        padding: '20px 0',
    },
    mpImageContainer: {
        height: 72,
        display: 'flex',
        justifyContent: 'center',
    },
    mpImage: {
        width: 72,
        height: 'auto',
        alignSelf: 'center',
    },
    mpBtn: {
        textTransform: 'unset',
        letterSpacing: '.5px',
        fontWeight: 550,
        '&.purple': {
            backgroundColor: colorPurple,
        },
        '&.gray': {
            backgroundColor: colorGray,
        },
        '&.blue': {
            backgroundColor: colorBlue,
        },
        '&.orange': {
            backgroundColor: colorOrange,
        },
    },
    autocompleteRoot: {
        verticalAlign: 'middle',
        display: 'inline-flex',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            minHeight: 36,
            padding: '0 9px',
        },
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 115px)',
        },
    },
    warning: {
        backgroundColor: '#CED2D8',
        padding: '15px 10px',
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        '& a': {
            color: '#408AC0',
        },
    },
}));

export default useStyles;
