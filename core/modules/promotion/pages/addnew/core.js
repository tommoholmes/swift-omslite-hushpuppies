import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/promotion/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const {
        Content, isEdit, data, locationSelected,
    } = props;
    const router = useRouter();

    const [promotionItems, setPromotionItems] = React.useState(isEdit ? data?.product_lines?.length : 1);
    const [promotionFree, setPromotionFree] = React.useState(isEdit ? data?.product_free_lines?.length : 1);
    const [skuCheck, setSkuCheck] = React.useState([]);
    const [firstLoad, setFirstLoad] = React.useState(true);

    const [savePromotion] = gqlService.savePromotion();
    const [isPromotionSkuExist] = gqlService.isPromotionSkuExist({
        onCompleted: (res) => {
            if (res.isPromotionSkuExist && res.isPromotionSkuExist.sku) {
                const temp = [...skuCheck, res.isPromotionSkuExist.sku];
                setSkuCheck(temp);
            }
        },
    });

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        savePromotion({
            variables: { input },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success Add New Promotion!',
                variant: 'success',
            });
            setTimeout(() => router.push('/marketing/promotion'), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const initialValues = () => {
        if (isEdit && data) {
            const {
                loc_code, loc_name, max_promotion_type, multiplication, channel,
                product_lines, product_free_lines, __typename,
                multiple_price, ...restData
            } = data;
            return {
                ...restData,
                all_product: !product_lines.length,
                from_date: data.from_date?.replace(' ', 'T'),
                to_date: data.to_date?.replace(' ', 'T'),
                company: locationSelected?.length && locationSelected[0]?.company_id,
                oms_location_id: locationSelected?.length && locationSelected[0]?.loc_id,
                promotion_items: product_lines,
                promotion_free_items: product_free_lines,
                multiple_price: !!multiple_price,
            };
        }
        return {
            all_product_qty: 0,
            max_promotion: 0,
            method: 0,
            status: 0,
            single_total_price: 0,
            promotion_items: [{ sku: '', qty: 0 }],
            promotion_free_items: [{
                sku: '', qty: 0,
            }],
        };
    };

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object().shape({
            all_product: Yup.boolean().required('Required!'),
            from_date: Yup.string().required('Required!'),
            to_date: Yup.string().required('Required!'),
            name: Yup.string().required('Required!'),
            oms_channel_id: Yup.array().of(Yup.string()).required('Required!'),
            oms_location_id: Yup.string().required('Required!'),
            type: Yup.string().required('Required!'),
            promotion_items: Yup.array().of(Yup.object().shape({
                sku: Yup.string().when('all_product', {
                    is: true,
                    then: Yup.string().required('Required'),
                }),
                qty: Yup.number().when('all_product', {
                    is: true,
                    then: Yup.string().required('Required'),
                }),
            })),
            promotion_free_items: Yup.array().of(Yup.object().shape({
                sku: Yup.string().required('Required!'),
                qty: Yup.number().required('Required!'),
            })),
        }),
        onSubmit: (values) => {
            const {
                company, oms_channel_id, promotion_free_items, promotion_items, single_total_price,
                ...restValues
            } = values;
            const freeItems = promotion_free_items.map(({
                __typename, qty, min_total_price, max_total_price, ...keepAttrs
            }) => {
                if (keepAttrs.sku !== '') {
                    const attrToReturn = {
                        ...keepAttrs,
                        qty: Number(qty),
                    };
                    if (values.multiple_price) {
                        attrToReturn.min_total_price = min_total_price ? Number(min_total_price) : 0;
                        attrToReturn.max_total_price = max_total_price ? Number(max_total_price) : 0;
                    }
                    return attrToReturn;
                }
                return null;
            }).filter(
                (element) => element !== null,
            );
            const items = promotion_items.map(({ __typename, qty, ...keepAttrs }) => {
                if (keepAttrs.sku !== '') {
                    return {
                        ...keepAttrs,
                        qty: Number(qty),
                    };
                }
                return null;
            }).filter(
                (element) => element !== null,
            );
            const valuesToSubmit = {
                ...restValues,
                all_product_qty: Number(restValues.all_product_qty),
                max_promotion: Number(restValues.max_promotion),
                method: Number(restValues.method),
                oms_channel_id: oms_channel_id.map((ch) => Number(ch)),
                oms_location_id: Number(restValues.oms_location_id),
                from_date: restValues.from_date?.replace('T', ' '),
                to_date: restValues.to_date?.replace('T', ' '),
                status: Number(restValues.status),
                single_total_price: single_total_price ? Number(single_total_price) : 0,
            };
            if (freeItems.length) {
                valuesToSubmit.promotion_free_items = freeItems;
            }
            if (items.length) {
                valuesToSubmit.promotion_items = items;
            }
            handleSubmit(valuesToSubmit);
        },
    });

    const [getLocationList, { loading: loadingLocation, data: dataLocation }] = gqlService.getLocationList({
        skip: !formik.values.company,
        variables: {
            filter: {
                company_id: {
                    eq: String(formik.values.company),
                },
            },
        },
    });

    const [getPromotionChannelsByLocId, { loading: loadingChannel, data: dataChannel }] = gqlService.getPromotionChannelsByLocId({
        skip: !Number(formik.values.oms_location_id),
        variables: {
            location_id: Number(formik.values.oms_location_id),
        },
        onCompleted: (res) => {
            if (res.getPromotionChannelsByLocId && data && data.channel && isEdit && firstLoad) {
                const channels = res.getPromotionChannelsByLocId;
                const existChannel = data.channel?.split(',');
                const temp = existChannel?.map((ch) => channels.find(
                    (obj) => obj.channel_name === ch,
                )?.channel_id).filter(
                    (element) => element !== undefined,
                );
                setFirstLoad(false);
                formik.setFieldValue('oms_channel_id', temp);
            }
        },
    });

    React.useEffect(() => {
        if (formik.values.company) {
            getLocationList();
        }
    }, [formik.values.company]);

    React.useEffect(() => {
        if (Number(formik.values.oms_location_id)) {
            getPromotionChannelsByLocId();
        }
    }, [formik.values.oms_location_id]);

    const contentProps = {
        formik,
        loadingLocation,
        dataLocation,
        promotionItems,
        setPromotionItems,
        promotionFree,
        setPromotionFree,
        isPromotionSkuExist,
        skuCheck,
        loadingChannel,
        dataChannel,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { loading: loadingCompany, data: dataCompany } = gqlService.getCompanyOptions();

    const router = useRouter();
    const id = router && router.query && Number(router.query.id);

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_promotion',
    });

    const { loading, data } = gqlService.getPromotionById({
        skip: !id,
        variables: { id: router && router.query && Number(router.query.id) },
    });

    const [getLocationList, { loading: loadingLocation, data: dataLocation }] = gqlService.getLocationList({
        skip: !id || !data,
        variables: {
            filter: {
                loc_code: {
                    eq: data?.getPromotionById?.loc_code,
                },
            },
        },
    });

    React.useEffect(() => {
        if (id) {
            getLocationList();
        }
    }, [id, data]);

    if (loadingCompany || aclCheckLoading || loading || loadingLocation) {
        return (
            <Layout pageConfig={{ title: 'Add New Promotion' }}>
                <div style={{
                    display: 'flex',
                    color: '#435179',
                    fontWeight: 600,
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                >
                    Loading...
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        dataCompany: dataCompany.getCompanyOptions,
        isEdit: !!id,
        data: data?.getPromotionById,
        locationSelected: dataLocation?.getLocationList?.items,
    };

    return (
        <Layout pageConfig={{ title: 'Add New Promotion' }}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
