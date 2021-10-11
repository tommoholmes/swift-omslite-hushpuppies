import { makeStyles } from '@material-ui/core/styles';

const colorGreen = '#5EC929';
const colorOrange = '#FF962C';
const colorRed = '#DA1414';
const colorGray = '#B1BCDB';

const useStyles = makeStyles(() => ({
    green: {
        color: colorGreen,
        fontWeight: 500,
    },
    orange: {
        color: colorOrange,
        fontWeight: 500,
    },
    red: {
        color: colorRed,
        fontWeight: 500,
    },
    gray: {
        color: colorGray,
        fontWeight: 500,
    },
}));

export default useStyles;
