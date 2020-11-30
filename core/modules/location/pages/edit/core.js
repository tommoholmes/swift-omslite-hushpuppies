import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '../../services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const location = data.getLocationById;
    const [updateLocation] = gqlService.updateLocation();

    const handleSubmit = ({
        company,
        code,
        name,
        street,
        region,
        city,
        telephone,
        postcode,
        longitude,
        latitude,
        zone,
        warehouse,
        useFrontend,
        sircloWarehouse,
        virtualLocation,
        priority,
        status,

    }) => {
        const variables = {
            company,
            code,
            name,
            street,
            region,
            city,
            telephone,
            postcode,
            longitude,
            latitude,
            zone,
            warehouse,
            useFrontend,
            sircloWarehouse,
            virtualLocation,
            priority,
            status,
        };
        updateLocation({
            variables,
        }).then((res) => {
            console.log(res);
            alert('Success edit Location');
            // need show succes message
        }).catch((e) => {
            alert(e);
        });
    };

    const formik = useFormik({
        initialValues: {
            company: location.company_id || '',
            code: location.loc_code || '',
            name: location.loc_name || '',
            street: location.loc_street || '',
            region: location.loc_region || '',
            city: location.loc_city || '',
            telephone: location.loc_telephone || '',
            postcode: location.loc_postcode || '',
            longitude: location.loc_long || '',
            latitude: location.loc_lat || '',
            zone: location.loc_zone || '',
            warehouse: location.is_warehouse || '',
            useFrontend: location.use_in_frontend || '',
            sircloWarehouse: location.is_circlo_warehouse || '',
            virtualLocation: location.is_virtual_location || '',
            priority: location.priority || '',
            status: location.is_active || '',
        },
        validationSchema: Yup.object().shape({
            company: Yup.number().required('Required!'),
            code: Yup.string().required('Required!'),
            name: Yup.string().required('Required!'),
            street: Yup.string().required('Required!'),
            region: Yup.string().required('Required!'),
            city: Yup.string().required('Required!'),
            telephone: Yup.string().required('Required!'),
            postcode: Yup.string().required('Required!'),
            longitude: Yup.string().required('Required!'),
            latitude: Yup.string().required('Required!'),
            zone: Yup.string().required('Required!'),
            warehouse: Yup.string().nullable(),
            useFrontend: Yup.number().nullable(),
            sircloWarehouse: Yup.number().nullable(),
            virtualLocation: Yup.number().nullable(),
            priority: Yup.number().nullable(),
            status: Yup.number().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getLocationById({
        id: router && router.query && Number(router.query.id),
    });

    if (loading) {
        return (
            <Layout>Loading...</Layout>
        );
    }

    if (!data) {
        return (
            <Layout>Data not found!</Layout>
        );
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
