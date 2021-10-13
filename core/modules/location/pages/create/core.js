import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/location/services/graphql';
import { optionsQtyBuffer, optionsYesNo } from '@modules/location/helpers';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
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
        qty_buffer,
        is_manage_stock,
        is_shipment_auto_complete,
        shipper_id,
    }) => {
        const variables = {
            company_id: company.company_id,
            loc_code: code,
            loc_name: name,
            loc_street: street,
            id: countries.id,
            loc_region: region.name,
            loc_city: city.value,
            loc_telephone: telephone,
            loc_postcode: postcode,
            loc_long: longitude,
            loc_lat: latitude,
            loc_zone: zone.name,
            is_warehouse: warehouse.id,
            use_in_frontend: useFrontend.id,
            is_sirclo_warehouse: sircloWarehouse.id,
            is_virtual_location: virtualLocation.id,
            priority: Number(priority || null),
            is_active: status.id,
            qty_buffer: qty_buffer.id,
            is_manage_stock: is_manage_stock.id,
            is_shipment_auto_complete: is_shipment_auto_complete.id,
            shipper_id,
        };
        window.backdropLoader(true);
        createLocation({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success create new Location',
                    variant: 'success',
                });
                setTimeout(() => router.push('/oms/location'), 250);
            })
            .catch((e) => {
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
            company: null,
            code: '',
            name: '',
            street: '',
            countries: {
                full_name_english: 'Indonesia',
                id: 'ID',
            },
            region: '',
            city: '',
            telephone: '',
            postcode: '',
            longitude: '',
            latitude: '',
            zone: { id: 0, name: 'Jawa' },
            warehouse: { id: 0, name: 'No' },
            useFrontend: { id: 0, name: 'No' },
            sircloWarehouse: { id: 0, name: 'No' },
            virtualLocation: { id: 0, name: 'No' },
            priority: '',
            status: { id: 1, name: 'Active' },
            qty_buffer: optionsQtyBuffer[0],
            is_manage_stock: optionsYesNo[0],
            is_shipment_auto_complete: optionsYesNo[0],
            shipper_id: '',
        },
        validationSchema: Yup.object().shape({
            company: Yup.object().required('Required!'),
            code: Yup.string().required('Required!'),
            name: Yup.string().required('Required!'),
            street: Yup.string().required('Required!'),
            countries: Yup.object().required('Required!'),
            region: Yup.object().required('Required!'),
            city: Yup.object().required('Required!'),
            telephone: Yup.string().required('Required!'),
            postcode: Yup.string().required('Required!'),
            longitude: Yup.string().required('Required!'),
            latitude: Yup.string().required('Required!'),
            zone: Yup.object().required('Required!'),
            warehouse: Yup.object().nullable(),
            useFrontend: Yup.object().nullable(),
            sircloWarehouse: Yup.object().nullable(),
            virtualLocation: Yup.object().nullable(),
            priority: Yup.number().nullable(),
            status: Yup.object().nullable(),
            qty_buffer: Yup.object().nullable(),
            is_manage_stock: Yup.object().nullable(),
            is_shipment_auto_complete: Yup.object().nullable(),
            shipper_id: Yup.string().nullable(),
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
