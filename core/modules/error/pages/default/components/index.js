import Link from 'next/link';
import useStyles from './style';

const ErrorContent = (props) => {
    const styles = useStyles();
    const { statusCode, title } = props;

    return (
        <div className={styles.error}>
            <div className={styles.wrapper}>
                {statusCode ? (
                    <h1 className={styles.h1}>{statusCode}</h1>
                ) : null}
                <div className={styles.desc}>
                    <h2 className={styles.h2}>{title}</h2>
                </div>
            </div>
            {statusCode === 404 ? (
                <div className={styles.actions}>
                    <Link href="/">
                        <a className={styles.toolbarButton}>Back</a>
                    </Link>
                </div>
            ) : null}
        </div>
    );
};

export default ErrorContent;
