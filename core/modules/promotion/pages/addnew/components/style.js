import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const borderColor = '#DDE1EC';
const colorGray = '#B1BCDB';

const useStyles = makeStyles((theme) => ({
    container: {
        fontFamily: font,
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        paddingBottom: 20,
        boxShadow: 'none',
        '& .title-information': {
            [theme.breakpoints.down('xs')]: {
                height: 75,
            },
            [theme.breakpoints.up('sm')]: {
                height: 75,
            },
            [theme.breakpoints.up('md')]: {
                height: 'auto',
            },
        },
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
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '18px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 18,
        '& hr': {
            margin: '12px -15px',
            background: borderColor,
            border: 0,
            height: 1,
        },
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
    },
    title: {
        fontFamily: font,
        color: colorText,
        fontSize: 14,
        textTransform: 'uppercase',
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
    },
    formFieldButton: {
        padding: '16px 0 30px 0px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        [theme.breakpoints.down('xs')]: {
            paddingRight: 10,
            paddingLeft: 0,
        },
        paddingRight: 30,
        paddingTop: 10,
        marginBottom: 10,
        fontWeight: 600,
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
        borderRadius: '20px !important',
        height: 35,
        '&.disabled': {
            borderColor,
        },
    },
    fieldInputMultiple: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: '20px !important',
        padding: '10px 10px',
        '&.disabled': {
            borderColor,
        },
    },
    selectControl: {
        margin: '8px 0px',
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
    },

    //
    gridAttribute: {
        // display: 'grid',
        // gridTemplateColumns: '30% 60% 10%',
        // [theme.breakpoints.down('xs')]: {
        //     gridTemplateColumns: '40% 60%',
        // },
        marginBottom: 15,
    },
    asterisk: {
        color: colorPurple,
        fontSize: 20,
    },
    errorHtml: {
        backgroundColor: '#F9E5E4',
        color: '#B30100',
        padding: '15px 10px',
        margin: '10px 0px',
        display: 'flex',
        alignItems: 'center',
        '& a': {
            color: '#408AC0',
        },
    },
    fieldInputFilter: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
            borderRadius: 20,
        },
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 20,
        },
    },
    controlLabel: {
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 13,
        },
    },

    titleSmall: {
        fontFamily: font,
        color: colorGray,
        fontSize: 16,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
        marginTop: 18,
    },

    titleWithButton: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonCount: {
        marginRight: '10px !important',
        minWidth: 'unset !important',
        height: 30,
        width: 30,
        marginBottom: 6,
    },

    gridInputTitle: {
        display: 'grid',
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        marginBottom: 20,
    },
    gridInput: {
        display: 'grid',
        marginBottom: 10,
    },
}));

export default useStyles;
