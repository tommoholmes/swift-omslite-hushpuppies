/* eslint-disable jsx-a11y/anchor-is-valid */
import useStyles from './style';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const CustomBreadcrumb = ({ data = []}) => {
    const styles = useStyles();
    return (
        <List className={styles.flexContainer}>
        {data.map((breadcrumb, index) => (
            <div key={breadcrumb.key}>
                <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbItem}>
                    <Link underline="none" color="inherit" href={breadcrumb.url}>
                        <span className={styles.breadcrumbActive}>{`${breadcrumb.label}`}</span>
                        <span className={styles.breadcrumbSeparator}>{`${index === data.length - 1 ? '' : '/'}`}</span>
                    </Link>
                </Breadcrumbs>
            </div>
        ))}
        </List>
    );
};

export default CustomBreadcrumb;