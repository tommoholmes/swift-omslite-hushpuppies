import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import useStyles from './style';

const CustomButton = ({
    variant = 'contained',
    className = {},
    buttonType = 'container',
    ...other
}) => {
    const classes = useStyles();
    const getClassByType = (type) => {
        if (type === 'primary') {
            return classes.primary;
        } if (type === 'outlined') {
            return classes.outlined;
        } if (type === 'buttonText') {
            return classes.buttonText;
        } if (type === 'link') {
            return classes.link;
        }
        return classes.container;
    }
    const customClass = classNames(
        getClassByType(buttonType),
        className,
    );

    return (
        <Button
            variant={variant}
            className={customClass}
            {...other}
        />
    );
};

export default CustomButton;
