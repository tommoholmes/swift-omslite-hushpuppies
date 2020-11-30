import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const [createLocation] = gqlService.createLocation();

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
            company_id: company,
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
            is_warehouse: warehouse,
            use_in_frontend: useFrontend,
            is_sirclo_warehouse: sircloWarehouse,
            is_virtual_location: virtualLocation,
            priority,
            is_active: status,
        };
        createLocation({
            variables,
        }).then((res) => {
            console.log(res);
            alert('Success create new Location');
            // need show succes message
        }).catch((e) => {
            alert(e);
        });
    };

    const formik = useFormik({
        initialValues: {
            company: '',
            code: '',
            name: '',
            street: '',
            region: '',
            city: '',
            telephone: '',
            postcode: '',
            longitude: '',
            latitude: '',
            zone: '',
            warehouse: '',
            useFrontend: '',
            sircloWarehouse: '',
            virtualLocation: '',
            priority: '',
            status: '',
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
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
