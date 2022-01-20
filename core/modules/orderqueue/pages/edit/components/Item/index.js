import { formatPriceNumber } from '@helper_currency';
import LocationAutoComplete from '@modules/orderqueue/pages/edit/components/locationAutoComplete';

const Item = (props) => {
    const {
        idx, aclCheckData, classes, setFieldValue, isModeEdit, item, errors, touched, channelCode,
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
        </tr>
    );
};

export default Item;
