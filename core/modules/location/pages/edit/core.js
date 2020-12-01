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
    const optionsYesNo = [
        { id: 0, name: 'No' },
        { id: 1, name: 'Yes' },
    ];
    const optionsActive = [
        { id: 0, name: 'Inactive' },
        { id: 1, name: 'Active' },
    ];

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
            id: location.loc_id,
            company_id: company.company_id,
            loc_code: code,
            loc_name: name,
            loc_street: street,
            loc_region: region,
            loc_city: city,
            loc_telephone: telephone,
            loc_postcode: postcode,
            loc_long: longitude,
            loc_lat: latitude,
            loc_zone: zone,
            is_warehouse: warehouse.id,
            use_in_frontend: useFrontend.id,
            is_sirclo_warehouse: sircloWarehouse.id,
            is_virtual_location: virtualLocation.id,
            priority: Number(priority || null),
            is_active: status.id,
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
            company: {
                company_id: location.company.company_id,
                company_name: location.company.company_name,
            },
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
            warehouse: optionsYesNo.find((e) => e.id === location.is_warehouse),
            useFrontend: optionsYesNo.find((e) => e.id === location.use_in_frontend),
            sircloWarehouse: optionsYesNo.find((e) => e.id === location.is_sirclo_warehouse),
            virtualLocation: optionsYesNo.find((e) => e.id === location.is_virtual_location),
            priority: location.priority || null,
            status: optionsActive.find((e) => e.id === location.is_active),
        },
        validationSchema: Yup.object().shape({
            company: Yup.object().required('Required!'),
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
            warehouse: Yup.object().nullable(),
            useFrontend: Yup.object().nullable(),
            sircloWarehouse: Yup.object().nullable(),
            virtualLocation: Yup.object().nullable(),
            priority: Yup.number().nullable(),
            status: Yup.object().nullable(),
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
