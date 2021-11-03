/* eslint-disable react/forbid-prop-types */
import { useDropzone } from 'react-dropzone';
import React from 'react';
import useStyles from '@common_dropfile/style';
import Button from '@common_button';

const DropFile = ({
    title = '', textButton = 'Choose File', formatFile = '.csv', getBase64,
}) => {
    const classes = useStyles();
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
    const onDropAccepted = async (files) => {
        let filebase64 = [];
        for (let ind = 0; ind < files.length; ind += 1) {
            // eslint-disable-next-line no-await-in-loop
            const baseCode = await toBase64(files[ind]);
            if (baseCode) {
                filebase64 = [
                    ...filebase64,
                    {
                        baseCode,
                        file: files[ind],
                    },
                ];
            }
        }
        getBase64(filebase64);
    };
    const messageError = `${`common:fileUpload:reject${formatFile}`}`;
    const {
        getRootProps, getInputProps, acceptedFiles, open,
    } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDropAccepted,
        accept: formatFile,
        onDropRejected: () => window.toastMessage({
            open: true,
            text: messageError,
            variant: 'error',
        }),
    });
    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path}
            {' '}
            -
            {file.size}
            {' '}
            bytes
        </li>
    ));

    return (
        <div className={classes.contentDropFile}>
            {title}
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Button className={classes.btn} type="button" onClick={open}>
                    {textButton}
                </Button>
                {files.length === 0 && <span className={classes.textNoFile}>No file chosen</span>}
            </div>
            <aside>
                <ul>{files}</ul>
            </aside>
        </div>
    );
};

export default DropFile;
