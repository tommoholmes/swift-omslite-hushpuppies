/* eslint-disable prefer-destructuring */
import gqlService from '@modules/registervendor/services/graphql';
import { useRouter } from 'next/router';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const pageConfig = {
        header: false,
        sidebar: false,
        title: 'Request New Vendor',
    };
    const [addNewVendor] = gqlService.addNewVendorRequest();
    const [getCountries, getCountriesRes] = gqlService.getCountries();
    const [getRegion, getRegionRes] = gqlService.getRegion();
    const [getCityKecByRegionCode, getCityKecByRegionCodeRes] = gqlService.getCityKecByRegionCode();
    const handleSubmit = (input) => {
        window.backdropLoader(true);
        addNewVendor({
            variables: { input },
        }).then(() => {
            window.toastMessage({
                open: true,
                variant: 'success',
                text: 'Congratulation, your registration will be processed immediately.',
            });
            setTimeout(() => { router.push('/login'); }, 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: e.message,
            });
        });
    };

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            company_street: '',
            company_country_id: '',
            company_region: '',
            company_city: '',
            no_telephone: '',
            company_code: '',
            company_name: '',
        },
        validationSchema: Yup.object().shape({
            first_name: Yup.string().required('Required!'),
            last_name: Yup.string().required('Required!'),
            email: Yup.string().email('Email not valid').required('Required!'),
            password: Yup.string().required('Required!'),
            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
            company_code: Yup.string().required('Required!'),
            company_name: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            const {
                company_country_id, company_region, company_city, ...restValues
            } = values;
            const input = {
                company_country_id: String(company_country_id?.id) || '',
                company_region: company_region.code || '',
                company_city: company_city.value || '',
                ...restValues,
            };
            handleSubmit(input);
        },
    });

    const contentProps = {
        formik,
        handleSubmit,
        getCountries,
        getCountriesRes,
        getRegion,
        getRegionRes,
        getCityKecByRegionCode,
        getCityKecByRegionCodeRes,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
