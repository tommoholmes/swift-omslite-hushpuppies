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
        countries,
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
            company_id: company.company_id,
            loc_code: code,
            loc_name: name,
            loc_street: street,
            id: countries.id,
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
            company: null,
            code: '',
            name: '',
            street: '',
            countries: null,
            region: '',
            city: '',
            telephone: '',
            postcode: '',
            longitude: '',
            latitude: '',
            zone: '',
            warehouse: { id: 0, name: 'No' },
            useFrontend: { id: 0, name: 'No' },
            sircloWarehouse: { id: 0, name: 'No' },
            virtualLocation: { id: 0, name: 'No' },
            priority: null,
            status: { id: 1, name: 'Active' },
        },
        validationSchema: Yup.object().shape({
            company: Yup.object().required('Required!'),
            code: Yup.string().required('Required!'),
            name: Yup.string().required('Required!'),
            street: Yup.string().required('Required!'),
            countries: Yup.object().required('Required!'),
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
            // console.log(values);
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
