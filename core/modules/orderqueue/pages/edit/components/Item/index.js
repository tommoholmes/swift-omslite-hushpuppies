import { formatPriceNumber } from '@helper_currency';
import LocationAutoComplete from '@modules/orderqueue/pages/edit/components/locationAutoComplete';

const Item = (props) => {
    const {
        idx, aclCheckData, classes, setFieldValue, remove, isModeEdit, item, values, errors, touched, handleOpenModal, channelCode,
    } = props;

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
                {item.qty}
            </td>
            <td className={classes.td} style={{ textAlign: 'center' }}>
                {item.discount_amount}
            </td>
            <td className={classes.td} style={{ width: `${isModeEdit ? '300px' : 'auto'}` }}>
                {!isModeEdit ? (
                    <>{item.loc_code || '-'}</>
                ) : (
                    <LocationAutoComplete
                        classes={classes}
                        item={item}
                        idx={idx}
                        touched={touched}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        channelCode={channelCode}
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
