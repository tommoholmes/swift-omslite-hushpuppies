import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';
const borderColor = '#DDE1EC';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: 16,
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
        paddingLeft: '2%',
    },
    title: {
        fontFamily: font,
        color: colorText,
        fontSize: 14,
        textTransform: 'uppercase',
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
    accordionDetailRoot: {
        display: 'block !important',
    },
    formField: {
        display: 'grid',
        gridTemplateColumns: '30% 40% 20%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
        padding: 0,
    },
    formFieldMobile: {
        display: 'grid',
        gridTemplateColumns: '40% 60%',
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            paddingRight: 10,
            paddingLeft: 0,
            justifyContent: 'start',
        },
        paddingRight: 30,
        justifyContent: 'end',
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
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
    },
    fieldRoot: {
        verticalAlign: 'middle',
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: '20px !important',
        height: 35,
        '&.disabled': {
            borderColor,
        },
        '& .MuiOutlinedInput-input': {
            padding: '7px 14px',
        },
    },
    selectControl: {
        margin: '8px 0px',
    },
    controlLabel: {
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 14,
        },
    },
    rootLabel: {
        marginBottom: '3px !important',
        marginLeft: '2% !important',
    },
}));

export default useStyles;
