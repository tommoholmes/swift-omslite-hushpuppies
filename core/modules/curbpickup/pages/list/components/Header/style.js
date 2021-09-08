import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        paddingBottom: '32px',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 17,
            paddingRight: 17,
            paddingBottom: 12,
        },
    },
    title: {
        display: 'inline',
        color: colorPurple,
        fontFamily: font,
        fontSize: 24,
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            margin: 0,
        },
    },
    buttonTab: {
        display: 'inline',
        borderRadius: 20,
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]: {
            marginTop: 7,
        },
        '&.nonactive': {
            background: '#ffffff',
            color: colorPurple,
            border: '2px solid',
            borderColor: colorPurple,
            marginLeft: 20,
        },
    },
}));

export default useStyles;
