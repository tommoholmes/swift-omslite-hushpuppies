import React, { useEffect, useState } from 'react';
import gqlService from '@modules/vendorbulktools/services/graphql';
import { useRouter } from 'next/router';
import { tutorialOptions } from '@modules/vendorbulktools/helpers/tutorialOptions';

const TutorialUploadContent = () => {
    const [urlDownload, setUrlDownload] = useState('');
    const [downloadSampleCsv] = gqlService.downloadSampleCsv();
    const router = useRouter();
    const { code } = router.query;

    const tutorial = tutorialOptions.find((item) => item.code === code);

    useEffect(async () => {
        if (tutorial) {
            try {
                const variables = {
                    type: tutorial.sample,
                };
                const res = await downloadSampleCsv({
                    variables,
                });
                setUrlDownload(res && res.data && res.data.downloadSampleCsv);
                // eslint-disable-next-line no-empty
            } catch (error) {}
        }
    }, [tutorial]);

    useEffect(() => {
        if (!code || !tutorial) {
            router.push('/vendorportal/bulktools');
        }
    }, [code]);

    return (
        <>
            {tutorial
                && React.cloneElement(tutorial.component, { urlDownload, tutorialName: tutorial.name, excelImageUrl: tutorial.excel_image_url })}
        </>
    );
};

export default TutorialUploadContent;
