/* eslint-disable prefer-destructuring */
import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import useStyles from '@modules/promotion/pages/detail/components/style';
import clsx from 'clsx';
import Button from '@common_button';

const ProductListEditContent = (props) => {
    const {
        data,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Button
                        className={classes.btnBack}
                        onClick={() => router.push('/marketing/promotion')}
                        variant="contained"
                        style={{ marginRight: 16 }}
                    >
                        <ChevronLeftIcon style={{
                            fontSize: 30,
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        />
                    </Button>
                    <h2 className={classes.titleTop}>
                        Promotion
                        {' '}
                        {data.id}
                    </h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        className={classes.btnEdit}
                        variant="contained"
                        onClick={() => router.push(`/marketing/promotion/addnew/${data.id}`)}
                    >
                        Edit
                    </Button>
                </div>
            </div>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>Promotion Detail</h5>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Date From
                            </span>
                        </div>
                        <div className={classes.divData}>
                            {data.from_date || '-'}
                        </div>
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Date To
                            </span>
                        </div>
                        <div className={classes.divData}>
                            {data.to_date || '-'}
                        </div>
                    </div>
                    <div className={classes.gridAttribute}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>
                                Location
                            </span>
                        </div>
                        <div className={classes.divData}>
                            {data.loc_name || '-'}
                        </div>
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Type
                            </span>
                        </div>
                        <div className={classes.divData}>
                            {data.type || '-'}
                        </div>
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Name
                            </span>
                        </div>
                        <div className={classes.divData}>
                            {data.name || '-'}
                        </div>
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Description
                            </span>
                        </div>
                        <div className={classes.divData}>
                            {data.description || '-'}
                        </div>
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Channel
                            </span>
                        </div>
                        <div className={classes.divData}>
                            {data.channel || '-'}
                        </div>
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Status
                            </span>
                        </div>
                        <div className={classes.divData}>
                            {String(data.status) === '0' ? 'Disable' : 'Enable'}
                        </div>
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Method
                            </span>
                        </div>
                        <div className={classes.divData}>
                            {String(data.method) === '0' ? 'AND' : 'OR'}
                        </div>
                    </div>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Multiplication
                            </span>
                        </div>
                        <div className={classes.divData}>
                            {String(data.multiplication) === '0' ? 'No' : 'Yes'}
                        </div>
                    </div>
                    {data.max_promotion
                        ? (
                            <div className={classes.gridAttribute}>
                                <div
                                    className={classes.divLabel}
                                >
                                    <span className={classes.label}>
                                        Max Promotion
                                    </span>
                                </div>
                                <div className={classes.divData}>
                                    {data.max_promotion}
                                </div>
                            </div>
                        ) : null}
                    {data.all_product_qty
                        ? (
                            <div className={classes.gridAttribute}>
                                <div
                                    className={classes.divLabel}
                                >
                                    <span className={classes.label}>
                                        All Product Qty
                                    </span>
                                </div>
                                <div className={classes.divData}>
                                    {data.all_product_qty}
                                </div>
                            </div>
                        ) : null}
                    <div className={clsx(classes.gridAttribute, String(data.multiple_price) !== '0' && 'no-border')}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                Multiple Price
                            </span>
                        </div>
                        <div className={classes.divData}>
                            {String(data.multiple_price) === '0' ? 'No' : 'Yes'}
                        </div>
                    </div>
                    {!data.multiple_price
                        ? (
                            <div className={clsx(classes.gridAttribute, 'no-border')}>
                                <div
                                    className={classes.divLabel}
                                >
                                    <span className={classes.label}>
                                        Min. Total Price
                                    </span>
                                </div>
                                <div className={classes.divData}>
                                    {data.single_total_price}
                                </div>
                            </div>
                        ) : null}
                </div>
                {data.product_lines.length && !data.all_product_qty
                    ? (
                        <div className={classes.content}>
                            <h5 className={classes.titleSmall}>Product Lines</h5>
                            <div className={classes.gridInputTitle} style={{ gridTemplateColumns: '70% 30%' }}>
                                <div
                                    className={classes.divLabel}
                                >
                                    <span className={classes.label}>
                                        SKU
                                    </span>
                                </div>
                                <div
                                    className={classes.divLabel}
                                >
                                    <span className={classes.label}>
                                        QTY
                                    </span>
                                </div>
                            </div>
                            {data.product_lines.map((line, idx) => (
                                <div className={classes.gridInput} key={idx} style={{ gridTemplateColumns: '70% 30%' }}>
                                    <div className={classes.divData}>
                                        {line.sku}
                                    </div>
                                    <div className={classes.divData}>
                                        {line.qty}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                    : null}

                {data.product_free_lines.length
                    ? (
                        <div className={classes.content}>
                            <h5 className={classes.titleSmall}>Product Free Lines</h5>
                            {!data.multiple_price
                                ? (
                                    <>
                                        <div className={classes.gridInputTitle} style={{ gridTemplateColumns: '70% 30%' }}>
                                            <div
                                                className={classes.divLabel}
                                            >
                                                <span className={classes.label}>
                                                    SKU Product
                                                </span>
                                            </div>
                                            <div
                                                className={classes.divLabel}
                                            >
                                                <span className={classes.label}>
                                                    Qty
                                                </span>
                                            </div>
                                        </div>
                                        {data.product_free_lines.map((line, idx) => (
                                            <div className={classes.gridInput} key={idx} style={{ gridTemplateColumns: '70% 30%' }}>
                                                <div className={classes.divData}>
                                                    {line.sku}
                                                </div>
                                                <div className={classes.divData}>
                                                    {line.qty}
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <div className={classes.gridInputTitle} style={{ gridTemplateColumns: 'repeat(3, 2fr) 1fr' }}>
                                            <div
                                                className={classes.divLabel}
                                            >
                                                <span className={classes.label}>
                                                    Min Total Price
                                                </span>
                                            </div>
                                            <div
                                                className={classes.divLabel}
                                            >
                                                <span className={classes.label}>
                                                    Max Total Price
                                                </span>
                                            </div>
                                            <div
                                                className={classes.divLabel}
                                            >
                                                <span className={classes.label}>
                                                    SKU Product
                                                </span>
                                            </div>
                                            <div
                                                className={classes.divLabel}
                                            >
                                                <span className={classes.label}>
                                                    Qty
                                                </span>
                                            </div>
                                        </div>
                                        {data.product_free_lines.map((line, idx) => (
                                            <div className={classes.gridInput} key={idx} style={{ gridTemplateColumns: 'repeat(3, 2fr) 1fr' }}>
                                                <div className={classes.divData}>
                                                    {line.min_total_price}
                                                </div>
                                                <div className={classes.divData}>
                                                    {line.max_total_price}
                                                </div>
                                                <div className={classes.divData}>
                                                    {line.sku}
                                                </div>
                                                <div className={classes.divData}>
                                                    {line.qty}
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                        </div>
                    )
                    : null}
            </Paper>
        </>
    );
};

export default ProductListEditContent;
