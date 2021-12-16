import Layout from '@layout';
import gqlService from '@modules/vendorbulktools/services/graphql';
import { useEffect, useState } from 'react';

const Core = (props) => {
    const { Content } = props;
    const [downloadSampleCsv] = gqlService.downloadSampleCsv();
    const [urlDownload, setUrlDownload] = useState('');

    useEffect(async () => {
        try {
            const variables = {
                type: 'vendor_product',
            };
            const res = await downloadSampleCsv({
                variables,
            });
            setUrlDownload(res && res.data && res.data.downloadSampleCsv);
            // eslint-disable-next-line no-empty
        } catch (error) {}
    }, []);

    const pageConfig = {
        title: 'Tutorial Upload Product',
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content urlDownload={urlDownload} />
        </Layout>
    );
};

export default Core;
