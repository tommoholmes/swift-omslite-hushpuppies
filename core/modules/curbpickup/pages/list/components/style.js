import { makeStyles } from '@material-ui/core/styles';

const colorYellow = '#FFD52C';
const colorOrange = '#FF962C';
const colorGreen = '#5EC929';
const colorAqua = '#29c3c9';
const colorBlue = '#2689ca';
const varPadding = '5px 10px';

const useStyles = makeStyles(() => ({
    process: {
        backgroundColor: colorYellow,
        border: '1px solid',
        borderColor: colorYellow,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    readyPack: {
        backgroundColor: colorOrange,
        border: '1px solid',
        borderColor: colorOrange,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    readyPickup: {
        backgroundColor: colorGreen,
        border: '1px solid',
        borderColor: colorGreen,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    customerPicked: {
        backgroundColor: colorBlue,
        border: '1px solid',
        borderColor: colorBlue,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    waiting: {
        backgroundColor: colorAqua,
        border: '1px solid',
        borderColor: colorAqua,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
}));

export default useStyles;
