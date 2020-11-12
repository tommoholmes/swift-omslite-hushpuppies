import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import useStyles from './style';

const CustomButton = ({
    variant = 'contained',
    className = {},
    ...other
}) => {
    const classes = useStyles();
    const customClass = classNames(
        classes.container,
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
