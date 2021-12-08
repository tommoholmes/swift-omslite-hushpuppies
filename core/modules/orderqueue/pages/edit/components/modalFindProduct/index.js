import React, { useEffect, useState } from 'react';
import Autocomplete from '@common_autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import clsx from 'clsx';
import Button from '@common_button';
import useStyles from '@modules/orderqueue/pages/edit/components/modalFindProduct/style';
import gqlProduct from '@modules/productlist/services/graphql';

const ModalFindProduct = (props) => {
    const {
        open, handleClose, idx, values, setFieldValue,
    } = props;
    const classes = useStyles();

    const [searchSKU, setSearchSKU] = useState('');
    const [optionsSKU, setOptionsSKU] = useState([]);
    const [selectedSKU, setSelectedSKU] = useState(null);

    const [getProductList, getProductListRes] = gqlProduct.getProductList();

    const handleSubmit = () => {
        setFieldValue(`order_items.${idx}.sku`, selectedSKU?.sku ?? '');
        setFieldValue(`order_items.${idx}.base_price`, selectedSKU?.product_price ?? 0);
        setFieldValue(`order_items.${idx}.name`, selectedSKU?.product_name ?? '');
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
        setSelectedSKU(null);
        handleClose();
    };

    useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchSKU && optionsSKU.filter((elm) => elm?.sku?.toLowerCase().includes(searchSKU?.toLowerCase()));
            if (searchSKU && isExist.length <= 3) {
                getProductList({
                    variables: {
                        pageSize: 20,
                        currentPage: 1,
                        filter: {
                            product_name: {
                                like: searchSKU,
                            },
                        },
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchSKU]);

    useEffect(() => {
        if (getProductListRes && getProductListRes.data && getProductListRes.data.getProductList && getProductListRes.data.getProductList.items) {
            const sku = new Set(optionsSKU.map((d) => d.sku));
            if (optionsSKU.length > 100) {
                setOptionsSKU(getProductListRes.data.getProductList.items);
            } else {
                setOptionsSKU([...optionsSKU, ...getProductListRes.data.getProductList.items.filter((d) => !sku.has(d.sku))]);
            }
        }
    }, [getProductListRes.data]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth="true" classes={{ paper: classes.paper }}>
            <div className={classes.textTitle}>
                <div>
                    Replace Product For
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
                        <Autocomplete
                            name={`order_items.${idx}.sku`}
                            mode={optionsSKU.length > 0 ? 'default' : 'lazy'}
                            className={`${classes.autocompleteRoot}`}
                            value={selectedSKU}
                            onChange={(e) => {
                                setSelectedSKU(e);
                            }}
                            loading={getProductListRes.loading}
                            options={optionsSKU}
                            getOptionsVariables={{
                                variables: {
                                    search: searchSKU,
                                    pageSize: 20,
                                    currentPage: 1,
                                },
                            }}
                            getOptions={getProductList}
                            primaryKey="sku"
                            labelKey="product_name"
                            onInputChange={(e) => setSearchSKU(e && e.target && e.target.value)}
                        />
                        <div style={{ margin: '0px 15px' }}>
                            <Button className={classes.btn} onClick={handleSubmit}>
                                Replace
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ModalFindProduct;
