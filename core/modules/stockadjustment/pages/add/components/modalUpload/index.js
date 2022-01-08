/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import clsx from 'clsx';
import Button from '@common_button';
import useStyles from '@modules/stockadjustment/pages/add/components/modalUpload/style';
import gqlSource from '@modules/source/services/graphql';
import gqlService from '@modules/stockadjustment/services/graphql';
import DropFile from '@common_dropfile';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const SKU_KEY = 'sku';
const STOCK_KEY = 'adj_qty';

const ModalFindProduct = (props) => {
    const {
        open, handleClose, addProduct, urlDownload, locationId,
    } = props;
    const classes = useStyles();
    const [csvToArrayOfObject] = gqlService.csvToArrayOfObject();
    const [getSourceList, { data: sourceData, error: sourceError, loading: sourceLoading }] = gqlSource.getSourceList();
    const [uploadedCsv, setUploadedCsv] = useState(null);
    const [mappedSku, setMappedSku] = useState([]);

    const formik = useFormik({
        initialValues: {
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required('Required!'),
        }),
        onSubmit: async (values) => {
            const variables = {
                binary: values.binary,
            };
            window.backdropLoader(true);
            handleClose();
            try {
                if (!locationId) {
                    throw new Error('Location is required');
                }
                const res = await csvToArrayOfObject({ variables });
                const data = res?.data?.csvToArrayOfObject ?? null;
                if (!data) {
                    throw new Error('upload failed');
                }

                const SKU_IDX = data?.headers.findIndex((header) => header === SKU_KEY);
                const STOCK_IDX = data?.headers.findIndex((header) => header === STOCK_KEY);
                if (SKU_IDX === -1 || STOCK_IDX === -1) {
                    throw new Error('csv missing header');
                }

                // mapping data to get list of sku
                const productSkuMapped = data?.rows
                    .map((row) => {
                        const sku = row?.columns[SKU_IDX]?.value ?? null;
                        if (sku) {
                            return sku;
                        }
                    })
                    .filter((item) => item);

                const productMapped = data?.rows
                    .map((row) => {
                        const stock = row?.columns[STOCK_IDX]?.value ?? null;
                        const sku = row?.columns[SKU_IDX]?.value ?? null;
                        if (stock && sku) {
                            return {
                                sku,
                                stock,
                            };
                        }
                    })
                    .filter((item) => item);

                setMappedSku(productSkuMapped);
                setUploadedCsv(productMapped);

                getSourceList({
                    variables: {
                        pageSize: 20,
                        currentPage: 1,
                        filter: {
                            loc_id: {
                                from: locationId.toString(),
                                to: locationId.toString(),
                            },
                            sku: {
                                in: productSkuMapped,
                            },
                        },
                    },
                });
                window.backdropLoader(false);
            } catch (error) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: error.message,
                    variant: 'error',
                });
            }
        },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];

        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode);
    };

    useEffect(() => {
        window.backdropLoader(false);
        if (sourceData && sourceData.getSourceList && sourceData.getSourceList.items && !sourceLoading) {
            const data = sourceData.getSourceList.items;
            if (data?.length === 0) {
                window.toastMessage({
                    open: true,
                    text: 'No product found',
                    variant: 'error',
                });
                return;
            }

            if (data?.length !== mappedSku?.length) {
                window.toastMessage({
                    open: true,
                    text: 'Some product not found',
                    variant: 'error',
                });
                return;
            }

            const mapped = data
                .map((item) => {
                    const sku = item?.sku ?? null;
                    const stock = item?.qty_total ?? null;
                    const uploaded = uploadedCsv?.find((itemUploaded) => itemUploaded?.sku === sku);
                    if (sku && stock && uploaded) {
                        return {
                            sku,
                            stock_available: stock,
                            stock_adjustment: Number(uploaded?.stock),
                            from_csv: true,
                        };
                    }
                })
                .filter((item) => item);

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < mapped.length; i++) {
                addProduct(mapped[i]);
            }
        }
    }, [sourceData, sourceError, sourceLoading]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth classes={{ paper: classes.paper }}>
            <div
                className={clsx(classes.textTitle, classes.content)}
                style={{
                    width: '100%', flexDirection: 'row', paddingTop: '20px', fontSize: '26px',
                }}
            >
                <div>Upload Products</div>
                <div>
                    <button type="button" className={classes.btnClear} onClick={() => handleClose()}>
                        ✕
                    </button>
                </div>
            </div>
            <DialogContent classes={{ root: clsx(classes.content) }}>
                <div className={classes.formField}>
                    <span className={classes.label}>
                        <a href={urlDownload} className={classes.linkDownload}>
                            Download the Sample CSV
                        </a>
                    </span>
                </div>
                <div className={clsx(classes.formField, classes.textLeft)}>
                    <DropFile title="Please select the file : " error={formik.errors.binary && formik.touched.binary} getBase64={handleDropFile} />
                </div>
                <div>
                    <Button className={classes.btn} onClick={formik.handleSubmit}>
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ModalFindProduct;
