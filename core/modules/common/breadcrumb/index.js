/* eslint-disable jsx-a11y/anchor-is-valid */
import useStyles from './style';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';

const CustomBreadcrumb = ({ data = []}) => {
    const styles = useStyles();
    return (
        <List className={styles.flexContainer}>
        {data.map((breadcrumb, index) => (
            <div key={breadcrumb.key}>
                <ListItem className={styles.breadcrumbItem}>
                    <Link href={breadcrumb.url}>
                        <a className={styles.flexContainer}>
                            <ListItemText primary={`${breadcrumb.label} ${index === data.length - 1 ? '' : '/'}`} />
                        </a>
                    </Link>
                </ListItem>
            </div>
        ))}
        </List>
    );
};

export default CustomBreadcrumb;