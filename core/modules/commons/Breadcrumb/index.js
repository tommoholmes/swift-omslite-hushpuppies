/* eslint-disable jsx-a11y/anchor-is-valid */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from 'next/link';
import clsx from 'clsx';
import useStyles from './style';

const CustomBreadcrumb = ({ data = [] }) => {
    const styles = useStyles();
    return (
        <List className={clsx(styles.flexContainer, styles.containerMobile)}>
            {data.map((breadcrumb, index) => (
                <div key={index}>
                    <ListItem className={styles.breadcrumbItem}>
                        <Link href={breadcrumb.url}>
                            <a className={styles.flexContainer}>
                                <span className={styles.breadcrumbActive}>{`${breadcrumb.label}`}</span>
                                <span className={styles.breadcrumbSeparator}>{`${index === data.length - 1 ? '' : '/'}`}</span>
                            </a>
                        </Link>
                    </ListItem>
                </div>
            ))}
        </List>
    );
};

export default CustomBreadcrumb;
