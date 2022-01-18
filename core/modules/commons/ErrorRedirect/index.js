import { useRouter } from 'next/router';
import Layout from '@layout';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Message = dynamic(() => import('@common_toast'), { ssr: false });

const ErrorRedirect = (props) => {
    const { errMsg, redirect, pageConfig = null } = props;
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (router && redirect) {
            setTimeout(() => {
                router.push(redirect);
            }, 1000);
        }
    }, [router]);

    return (
        <>
            <Message open={isOpen} setOpen={(stat) => setTimeout(() => setIsOpen(stat), 5000)} variant="error" message={errMsg} />
            <Layout pageConfig={pageConfig}>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    {errMsg}
                </div>
            </Layout>
        </>
    );
};

export default ErrorRedirect;
