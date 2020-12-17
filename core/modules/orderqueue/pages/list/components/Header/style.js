import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles(() => ({
    headerContainer: {
        paddingBottom: '32px',
    },
    title: {
        display: 'inline',
        color: colorPurple,
        fontFamily: font,
        fontSize: 24,
    },
    buttonAdd: {
        display: 'inline',
        float: 'right',
        borderRadius: 20,
        textTransform: 'capitalize',
    },
}));

export default useStyles;
