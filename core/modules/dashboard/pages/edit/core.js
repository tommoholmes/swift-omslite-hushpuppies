import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/dashboard/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const userData = data.customer;
    const [changePasswordGql] = gqlService.changePassword();
    const [changeNameGql] = gqlService.changeName();
    const [changeEmailGql] = gqlService.changeEmail();

    const handleSubmit = ({
        firstname, lastname, email, currentPassword, newPassword, changePassword, changeEmail,
    }) => {
        window.backdropLoader(true);

        if (changePassword === true && changeEmail === true) {
            const variables = {
                firstname, lastname, email, password: currentPassword, newPassword, currentPassword,
            };

            changePasswordGql({
                variables,
            }).then(() => {
                changeEmailGql({
                    variables,
                }).then(() => {
                    changeNameGql({
                        variables,
                    }).then(() => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            text: 'Success edit information!',
                            variant: 'success',
                        });
                    }).catch((e) => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            text: e.message,
                            variant: 'error',
                        });
                    });
                }).catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        } else if (changePassword === true && changeEmail === false) {
            const variables = {
                newPassword, currentPassword, firstname, lastname,
            };

            changePasswordGql({
                variables,
            }).then(() => {
                changeNameGql({
                    variables,
                }).then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: 'Success edit password and name!',
                        variant: 'success',
                    });
                }).catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        } else if (changePassword === false && changeEmail === true) {
            const variables = {
                email, password: currentPassword, firstname, lastname,
            };

            changeEmailGql({
                variables,
            }).then(() => {
                changeNameGql({
                    variables,
                }).then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: 'Success edit email and name!',
                        variant: 'success',
                    });
                }).catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        } else {
            const variables = { firstname, lastname };

            changeNameGql({
                variables,
            }).then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success edit name!',
                    variant: 'success',
                });
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            email: userData.email,
            firstname: userData.firstname,
            lastname: userData.lastname,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            customer_loc_code: userData.customer_loc_code,
            changeEmail: true,
            changePassword: true,

        },
        validationSchema: Yup.object().shape({
            email: Yup.string().when('changeEmail', {
                is: true,
                then: Yup.string().required('Required!').email('Valid email required'),
            }),
            firstname: Yup.string().required('Required!'),
            lastname: Yup.string().required('Required!'),
            currentPassword: Yup.string()
                .when('changeEmail', {
                    is: true,
                    then: Yup.string().required('Required!'),
                })
                .when('changePassword', {
                    is: true,
                    then: Yup.string().required('Required!'),
                }),
            newPassword: Yup.string()
                .when('changePassword', {
                    is: true,
                    then: Yup.string().required('Required!'),
                }),
            confirmPassword: Yup.string().when('changePassword', {
                is: true,
                then: Yup.string()
                    .required('Required!')
                    .required('Please confirm your password')
                    .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
            }),
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
    const { loading, data } = gqlService.getCustomer();

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
