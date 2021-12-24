import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/managevendor/services/graphql';
import aclService from '@modules/theme/services/graphql';
import locationGqlService from '@modules/location/services/graphql';
import Cookies from 'js-cookie';

const ContentWrapper = (props) => {
    const {
        data,
        dataCourier,
        dataShipper,
        Content,
        getCountries,
        getCountriesRes,
    } = props;
    const router = useRouter();
    const vendor = data.getVendorById;
    const [vendorUpdate] = gqlService.vendorUpdate();
    const [getCountry, getCountryRes] = locationGqlService.getCountry();
    const [getCityKecByRegionCode, getCityKecByRegionCodeRes] = locationGqlService.getCityKecByRegionCode();
    const [firstRender, setFirstRender] = React.useState(true);

    const isVendor = JSON.parse(Cookies.get('cdt'))?.customer_company_code !== null;

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        vendorUpdate({
            variables: { input },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success edit Vendor!',
                variant: 'success',
            });
            setTimeout(() => router.push('/vendorportal/managevendor'), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const formik = useFormik({
        initialValues: {
            company_id: vendor.company_id,
            company_code: vendor.company_code,
            company_name: vendor.company_name,
            company_street: vendor.company_street,
            company_country_id: getCountriesRes.data?.countries.find((country) => country.id === vendor.company_country_id),
            company_region: '',
            company_city: { label: vendor.company_city, value: vendor.company_city },
            no_telephone: vendor.no_telephone,
            is_new_product: vendor.is_new_product,
            company_margin: vendor.company_margin,
            is_product_approval: vendor.is_product_approval,
            logo: vendor.logo,
            promotion_banner: vendor.promotion_banner,
            shipper_shipping: vendor.shipper_shipping?.length
                ? vendor.shipper_shipping.map((code) => (dataShipper.find((ship) => ship.value === code)))
                : [],
            vendor_shipping: vendor.vendor_shipping?.length
                ? vendor.vendor_shipping.map((code) => (dataCourier.find((ship) => ship.value === code)))
                : [],
        },
        validationSchema: Yup.object().shape({
            company_code: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            const {
                shipper_shipping, vendor_shipping, logo,
                company_country_id, company_region, company_city, promotion_banner,
                is_new_product, company_margin, is_product_approval,
                ...restValues
            } = values;
            let valuesToSubmit = {};
            if (isVendor) {
                valuesToSubmit = {
                    ...restValues,
                    shipper_shipping: shipper_shipping?.map((ship) => ship.value),
                    vendor_shipping: vendor_shipping?.map((ship) => ship.value),
                    company_country_id: company_country_id?.id || '',
                    company_region: company_region?.code || '',
                    company_city: company_city?.value || '',
                };
                if (logo !== vendor.logo) {
                    valuesToSubmit.logo = logo;
                }
                if (promotion_banner && promotion_banner !== vendor.promotion_banner) {
                    valuesToSubmit.promotion_banner = promotion_banner;
                }
                if (vendor.promotion_banner && !promotion_banner) {
                    valuesToSubmit.promotion_banner_deleted = true;
                }
            } else {
                valuesToSubmit = {
                    is_new_product,
                    company_margin: company_margin ? Number(company_margin) : 0,
                    is_product_approval,
                };
            }
            handleSubmit(valuesToSubmit);
        },
    });

    const handleDropFile = (name, files) => {
        const { baseCode } = files[0];
        formik.setFieldValue(name, baseCode);
    };

    React.useEffect(() => {
        if (vendor.company_country_id) {
            getCountry({
                variables: {
                    id: vendor.company_country_id,
                },
            });
        }
    }, []);

    React.useEffect(() => {
        if (firstRender && getCountryRes.data) {
            const currentRegion = getCountryRes.data?.country.available_regions.find((val) => val.code === vendor.company_region);
            formik.setFieldValue('company_region', currentRegion);
            setFirstRender(false);
        }
    }, [getCountryRes.data]);

    React.useEffect(() => {
        if (vendor.company_region) {
            getCityKecByRegionCode({
                variables: {
                    region_code: vendor.company_region,
                },
            });
        }
    }, []);

    const contentProps = {
        formik,
        isVendor,
        vendor,
        dataCourier,
        dataShipper,
        handleDropFile,
        getCountries,
        getCountriesRes,
        getCountry,
        getCountryRes,
        getCityKecByRegionCode,
        getCityKecByRegionCodeRes,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'manageVendor',
    });

    const [getCountries, getCountriesRes] = locationGqlService.getCountries();
    const { loading: loadingCourier, data: dataCourier } = gqlService.getCourierOption();
    const { loading: shipperLoading, data: dataShipper } = gqlService.getShipperMethodOption();
    const { loading, data } = gqlService.getVendorById({
        id: router && router.query && Number(router.query.id),
    });

    const pageConfig = {
        title: `Manage Vendor ${data && data.getVendorById && data.getVendorById.company_name ? data.getVendorById.company_name : ''}`,
    };

    React.useEffect(() => {
        getCountries();
    }, []);

    if (loading || loadingCourier || shipperLoading || aclCheckLoading || getCountriesRes.loading) {
        return (
            <Layout pageConfig={pageConfig}>Loading...</Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    if (!data) {
        return (
            <Layout pageConfig={pageConfig}>Data not found!</Layout>
        );
    }

    const contentProps = {
        data,
        dataCourier: dataCourier.getCourierOption,
        dataShipper: dataShipper.getShipperMethodOption,
        getCountries,
        getCountriesRes,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
