import React, { useEffect, useState } from 'react';
import Autocomplete from '@common_autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import clsx from 'clsx';
import Button from '@common_button';
import useStyles from '@modules/orderqueue/pages/edit/components/modalFindProduct/style';
import gqlService from '@modules/orderqueue/services/graphql';
import gqlProduct from '@modules/productlist/services/graphql';

const ModalFindProduct = (props) => {
    const {
        open, handleClose, idx, values, setFieldValue,
    } = props;
    const classes = useStyles();

    const [searchSKU, setSearchSKU] = useState();
    const [optionsSKU, setOptionsSKU] = useState([]);
    const [selectedSKU, setSelectedSKU] = useState(null);
    const [skuQty, setSkuQty] = useState(0);

    const [getUniqueProductFromSource, getUniqueProductFromSourceRes] = gqlService.getUniqueProductFromSource();
    const [getProductList, getProductListRes] = gqlProduct.getProductListBySku();

    const handleSubmit = () => {
        handleClose();
        if (selectedSKU) {
            getProductList({
                variables: {
                    pageSize: 1,
                    currentPage: 1,
                    querySearch: selectedSKU?.sku,
                },
            });
        }
    };

    useEffect(() => {
        if (open) {
            setSelectedSKU(values?.order_items[idx]?.replacement_for && optionsSKU.find((item) => item.sku === values.order_items[idx].sku));
            setSkuQty(values?.order_items[idx]?.qty);
        }
    }, [open]);

    useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchSKU && optionsSKU.filter((elm) => elm?.sku?.toLowerCase().includes(searchSKU?.toLowerCase()));
            if (searchSKU && isExist.length <= 3) {
                getUniqueProductFromSource({
                    variables: {
                        pageSize: 20,
                        currentPage: 1,
                        filter: {
                            sku: {
                                like: searchSKU,
                            },
                        },
                    },
                });
            }

            return null;
        }, 250);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchSKU]);

    useEffect(() => {
        if (
            getUniqueProductFromSourceRes
            && getUniqueProductFromSourceRes.data
            && getUniqueProductFromSourceRes.data.getUniqueProductFromSource
            && getUniqueProductFromSourceRes.data.getUniqueProductFromSource.items
        ) {
            const sku = new Set(optionsSKU.map((d) => d.sku));
            if (optionsSKU.length > 100) {
                setOptionsSKU(getUniqueProductFromSourceRes.data.getUniqueProductFromSource.items);
            } else {
                setOptionsSKU([...optionsSKU, ...getUniqueProductFromSourceRes.data.getUniqueProductFromSource.items.filter((d) => !sku.has(d.sku))]);
            }
        }
    }, [getUniqueProductFromSourceRes.data]);

    useEffect(() => {
        if (
            getProductListRes
            && getProductListRes.data
            && getProductListRes.data.getProductList
            && getProductListRes.data.getProductList.items
            && getProductListRes.data.getProductList.items.length > 0
        ) {
            const product = getProductListRes.data.getProductList.items[0];
            setFieldValue(`order_items.${idx}.sku`, selectedSKU?.sku ?? '');
            setFieldValue(`order_items.${idx}.base_price`, product?.product_price ?? 0);
            setFieldValue(`order_items.${idx}.name`, product?.name ?? '');

            if (skuQty) {
                setFieldValue(`order_items.${idx}.qty`, skuQty);
            }

            if (values.order_items[idx]?.replacement_for) {
                setFieldValue(`order_items.${idx}.replacement_for`, values.order_items[idx].replacement_for);
            } else {
                setFieldValue(`order_items.${idx}.replacement_for`, values.order_items[idx].sku);
            }

            if (values.order_items[idx].item_id_replacement) {
                setFieldValue(`order_items.${idx}.item_id_replacement`, values.order_items[idx].item_id_replacement);
            } else {
                setFieldValue(`order_items.${idx}.item_id_replacement`, values.order_items[idx].id);
            }

            setFieldValue(`order_items.${idx}.loc_code`, null);
            setSelectedSKU(null);
            setSkuQty(null);
        }
    }, [getProductListRes.data]);

    useEffect(() => {
        if (getProductListRes.loading) {
            window.backdropLoader(true);
        } else {
            window.backdropLoader(false);
        }
    }, [getProductListRes.loading]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth classes={{ paper: classes.paper }}>
            <div className={classes.textTitle}>
                <div>
                    Replace Product For SKU
                    {' '}
                    {values.order_items[idx]?.replacement_for || values.order_items[idx]?.name || values.order_items[idx]?.sku}
                </div>
                <div>
                    <button type="button" className={classes.btnClear} onClick={() => handleClose()}>
                        ✕
                    </button>
                </div>
            </div>
            <DialogContent classes={{ root: clsx(classes.content, classes.contentCounter) }}>
                {idx !== null && (
                    <>
                        <div className={classes.inputProductContainer}>
                            <div className={classes.label}>Product SKU</div>
                            <div>
                                <Autocomplete
                                    defaultValue={{ sku: 'tes', product_name: 'tes' }}
                                    name={`order_items.${idx}.sku`}
                                    mode={optionsSKU.length > 0 ? 'default' : 'lazy'}
                                    className={`${classes.autocompleteRoot}`}
                                    value={selectedSKU}
                                    onChange={(e) => {
                                        setSelectedSKU(e);
                                    }}
                                    loading={getUniqueProductFromSourceRes.loading}
                                    options={optionsSKU}
                                    getOptionsVariables={{
                                        variables: {
                                            search: searchSKU,
                                            pageSize: 20,
                                            currentPage: 1,
                                        },
                                    }}
                                    getOptions={getUniqueProductFromSource}
                                    primaryKey="sku"
                                    labelKey="sku"
                                    onInputChange={(e) => setSearchSKU(e && e.target && e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={classes.inputQtyContainer}>
                            <div className={classes.label}>Qty</div>
                            <div>
                                <input
                                    type="number"
                                    className={classes.fieldQty}
                                    name={`order_items.[${idx}].qty`}
                                    value={skuQty}
                                    onChange={(e) => {
                                        if (e.target.value >= 0) {
                                            setSkuQty(e.target.value);
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className={classes.inputQtyContainer}>
                            <div className={classes.label} style={{ visibility: 'hidden' }}>
                                Replace
                            </div>
                            <div style={{ width: '100%' }}>
                                <Button className={classes.btn} onClick={handleSubmit}>
                                    Replace
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ModalFindProduct;
