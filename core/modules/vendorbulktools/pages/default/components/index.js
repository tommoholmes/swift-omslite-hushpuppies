import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import useStyles from '@modules/vendorbulktools/pages/default/components/style';
import Autocomplete from '@common_autocomplete';
import gqlService from '@modules/vendorbulktools/services/graphql';

const GqlDownloadSampleCsv = (props) => {
    const { gqlSampleDownloader, setUrlDownload } = props;
    const [downloadSampleCsv] = gqlSampleDownloader();
    useEffect(async () => {
        try {
            const gqlName = gqlSampleDownloader.name;
            const res = await downloadSampleCsv();
            setUrlDownload(res && res.data && res.data[gqlName]);
            // eslint-disable-next-line no-empty
        } catch (error) {
            setUrlDownload(null);
            window.toastMessage({
                open: true,
                text: `Sample CSV : ${error.message}`,
                variant: 'error',
            });
        }
    }, []);
    return null;
};

const VendorBulkToolsContent = (props) => {
    const { bulkToolsOptionsState, setBulkType, bulkType } = props;
    const classes = useStyles();
    const [downloadSampleCsv] = gqlService.downloadSampleCsv();
    const [urlDownload, setUrlDownload] = useState('');

    useEffect(async () => {
        if (bulkType?.sample && typeof bulkType?.sample === 'string') {
            try {
                const variables = {
                    type: bulkType?.sample,
                };
                const res = await downloadSampleCsv({
                    variables,
                });
                setUrlDownload(res && res.data && res.data.downloadSampleCsv);
                // eslint-disable-next-line no-empty
            } catch (error) {}
        }
    }, [bulkType]);

    const handleSubmit = async (variables, uploader) => {
        window.backdropLoader(true);

        try {
            await uploader({ variables });
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: `${bulkType?.name} Success`,
                variant: 'success',
            });
        } catch (error) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: error.message,
                variant: 'error',
            });
        }
    };

    return (
        <>
            <h2 className={classes.titleTop}>Product Bulk Tools</h2>
            <Paper className={classes.container}>
                <span className={clsx(classes.textAttach, classes.label)}>ATTACH FILE</span>
                <div className={classes.contentWithoutBorder}>
                    <div className={clsx(classes.formField, classes.textLeft)}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Bulk Type</span>
                        </div>
                        <Autocomplete
                            value={bulkType}
                            className={classes.autocompleteRoot}
                            onChange={(e) => {
                                setBulkType(e);
                            }}
                            defaultValue={{ loc_name: 'select', loc_code: 0 }}
                            options={bulkToolsOptionsState}
                            primaryKey="code"
                            labelKey="name"
                        />
                    </div>
                </div>
                {bulkType?.component
                    ? React.cloneElement(bulkType?.component, {
                        gqlUpload: bulkType?.gqlUpload,
                        urlDownload,
                        handleSubmit,
                        toolName: bulkType?.name,
                        code: bulkType?.code,
                        isNoTutorial: bulkType?.is_no_tutorial,
                    })
                    : null}
                {bulkType?.sample && typeof bulkType?.sample === 'function' && bulkType?.sample && (
                    <GqlDownloadSampleCsv gqlSampleDownloader={bulkType?.sample} setUrlDownload={setUrlDownload} />
                )}
            </Paper>
        </>
    );
};

export default VendorBulkToolsContent;
