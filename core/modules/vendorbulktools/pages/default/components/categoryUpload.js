/* eslint-disable operator-linebreak */
import React from 'react';
import Button from '@common_button';
import DropFile from '@common_dropfile';
import Autocomplete from '@common_autocomplete';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import useStyles from '@modules/vendorbulktools/pages/default/components/style';
import clsx from 'clsx';
import gqlChannel from '@modules/channel/services/graphql';

const CategoryUpload = (props) => {
    const { gqlUpload, urlDownload, handleSubmit } = props;
    const classes = useStyles();
    const [uploader] = gqlUpload();
    const [getChannelList, getChannelListRes] = gqlChannel.getChannelList();

    const formik = useFormik({
        initialValues: {
            binary: '',
            channelCode: null,
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required('File Required!'),
            channelCode: Yup.object().typeError('Required!').required('Required!'),
        }),
        onSubmit: async (values) => {
            let { channelCode } = values;
            if (typeof channelCode !== 'string') {
                channelCode = channelCode?.channel_code;
            }
            const variables = {
                binary: values.binary,
                channelCode,
            };
            handleSubmit(variables, uploader);
        },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];

        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode);
    };

    return (
        <>
            <div className={classes.contentWithoutBorder}>
                <div className={clsx(classes.formField, classes.textLeft)}>
                    <div className={classes.divLabel}>
                        <span className={[classes.label, classes.labelRequired].join(' ')}>Select Channel</span>
                    </div>
                    <Autocomplete
                        mode="lazy"
                        value={formik.values.channelCode}
                        className={classes.autocompleteRoot}
                        onChange={(e) => {
                            formik.setFieldValue('channelCode', e);
                        }}
                        loading={getChannelListRes?.loading}
                        options={
                            getChannelListRes &&
                            getChannelListRes.data &&
                            getChannelListRes.data.getChannelList &&
                            getChannelListRes.data.getChannelList.items
                        }
                        getOptions={getChannelList}
                        primaryKey="channel_code"
                        labelKey="channel_name"
                        error={!!(formik.touched.channelCode && formik.errors.channelCode)}
                        helperText={(formik.touched.channelCode && formik.errors.channelCode) || ''}
                    />
                </div>
            </div>
            <div className={classes.content}>
                <div className={classes.formField}>
                    <span className={classes.label}>
                        <a href={urlDownload} className={classes.linkDownload}>
                            Download the Sample CSV
                        </a>
                        <br />
                    </span>
                </div>

                <div className={clsx(classes.formField, classes.textLeft)}>
                    <DropFile title="Please select the file : " error={formik.touched.binary && formik.errors.binary} getBase64={handleDropFile} />
                    <p style={{ color: 'red', fontSize: '12px' }}>{formik.touched.binary && formik.errors.binary}</p>
                </div>
            </div>
            <div className={classes.formFieldButton}>
                <Button className={classes.btn} variant="contained" onClick={formik.handleSubmit}>
                    Submit
                </Button>
            </div>
        </>
    );
};

export default CategoryUpload;
