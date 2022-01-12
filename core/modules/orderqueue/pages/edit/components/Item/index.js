import { formatPriceNumber } from '@helper_currency';
import Autocomplete from '@common_autocomplete';
import { Field } from 'formik';
import gqlSource from '@modules/source/services/graphql';
import { useEffect, useRef, useState } from 'react';

const Item = (props) => {
    const {
        idx, aclCheckData, classes, setFieldValue, remove, isModeEdit, item, values, errors, touched, handleOpenModal, listLocation,
    } = props;

    const [getSourceList, { data: dataSource, loading: loadingSource }] = gqlSource.getSourceList();
    const [sourceOptions, setSourceOptions] = useState([]);
    const [searchSource, setSearchSource] = useState('');

    useEffect(() => {
        if (dataSource && dataSource.getSourceList && dataSource.getSourceList.items) {
            const prevSourceOptions = new Set(sourceOptions.map((d) => d.loc_id));
            const responseItems = dataSource.getSourceList.items;
            setSourceOptions([...sourceOptions, ...responseItems.filter((d) => !prevSourceOptions.has(d.loc_id))]);
        }
    }, [dataSource]);

    useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchSource && sourceOptions.filter((elm) => elm?.loc_name?.toLowerCase().includes(searchSource?.toLowerCase()));
            if (searchSource && isExist.length <= 3) {
                getSourceList({
                    variables: {
                        filter: {
                            sku: {
                                eq: item.sku,
                            },
                            loc_name: {
                                like: searchSource,
                            },
                        },
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchSource]);

    const firstRender = useRef(true);
    const actionRemoved = useRef(false);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        if (actionRemoved.current) {
            actionRemoved.current = false;
            return;
        }

        if (item && item?.sku) {
            setSourceOptions([]);
            const filter = {
                sku: {
                    eq: item.sku,
                },
            };
            getSourceList({
                variables: {
                    filter,
                    pageSize: 20,
                    currentPage: 1,
                },
            });
        }
    }, [item?.sku]);

    return (
        <tr>
            <td className={classes.td} style={{ paddingLeft: 0 }}>
                {item.sku}
            </td>
            <td className={classes.td}>{item.name}</td>
            <td className={classes.td} style={{ textAlign: 'center' }}>
                {typeof item.base_price === 'string' ? item.base_price : formatPriceNumber(item.base_price)}
            </td>
            <td className={classes.td} style={{ textAlign: 'center' }}>
                {isModeEdit ? <Field type="number" className={classes.fieldQty} name={`order_items.[${idx}].qty`} /> : item.qty}
            </td>
            <td className={classes.td} style={{ textAlign: 'center' }}>
                {item.discount_amount}
            </td>
            <td className={classes.td} style={{ width: `${isModeEdit ? '300px' : 'auto'}` }}>
                {!isModeEdit ? (
                    <>{item.loc_code || '-'}</>
                ) : (
                    <Autocomplete
                        mode={`${sourceOptions.length > 0 ? 'default' : 'lazy'}`}
                        className={classes.autocompleteRoot}
                        name={`order_items.[${idx}].loc_code`}
                        value={(() => {
                            if (typeof item.loc_code === 'string') {
                                const loc = listLocation?.find((e) => e.value === item.loc_code);
                                const tempVal = {
                                    loc_id: loc?.value,
                                    loc_name: loc?.label,
                                    loc_code: loc?.value,
                                };
                                if (sourceOptions.length > 0) {
                                    const currentVal = sourceOptions.find((elm) => elm.loc_name === loc.label);
                                    if (!currentVal) {
                                        setSourceOptions([...sourceOptions, tempVal]);
                                        return tempVal;
                                    }
                                    return currentVal;
                                }
                                return tempVal;
                            }
                            return item.loc_code;
                        })()}
                        onChange={(val) => {
                            setFieldValue(`order_items.[${idx}].loc_code`, val);
                            if (val) {
                                const loc = listLocation?.find((e) => e.label === val.loc_name);
                                if (typeof item.loc_code === 'string' && item.loc_code === loc.value) {
                                    return;
                                }
                                setFieldValue(`order_items.[${idx}].loc_code`, { ...val, loc_code: loc.value });
                            }
                        }}
                        primaryKey="loc_id"
                        labelKey="loc_name"
                        options={sourceOptions}
                        getOptions={() => {
                            getSourceList({
                                variables: {
                                    filter: {
                                        sku: {
                                            eq: item.sku,
                                        },
                                    },
                                    pageSize: 20,
                                    currentPage: 1,
                                },
                            });
                        }}
                        onInputChange={(elm) => setSearchSource(elm && elm.target && elm.target.value)}
                        loading={loadingSource}
                        error={!!(touched.location && errors.location)}
                        helperText={(touched.location && errors.location) || ''}
                        fullWidth
                    />
                )}
            </td>
            <td className={classes.td}>{item.pickup_name || '-'}</td>
            {(aclCheckData && aclCheckData.isAccessAllowed) === true && <td className={classes.td}>{item.replacement_for || '-'}</td>}
            {isModeEdit && (
                <td className={classes.td} style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ margin: 'auto 5px', display: 'flex' }}>
                        <img src="/assets/img/replace.svg" alt="replace" />
                        <button type="button" className={`link-button ${classes.btnClear}`} onClick={() => handleOpenModal(idx)}>
                            replace
                        </button>
                    </div>
                    <div style={{ margin: 'auto 5px', display: 'flex' }}>
                        <img src="/assets/img/trash.svg" alt="delete" />
                        <button
                            type="button"
                            className={`link-button ${classes.btnClear}`}
                            onClick={() => {
                                actionRemoved.current = true;
                                const tempDeletedItems = [...values.deleted_items];
                                tempDeletedItems.push({ ...values.order_items[idx], is_deleted: true });

                                setFieldValue('deleted_items', tempDeletedItems);
                                remove(idx);
                            }}
                        >
                            delete
                        </button>
                    </div>
                </td>
            )}
        </tr>
    );
};

export default Item;
