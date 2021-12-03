import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/marketplacebrand/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        dataLocation,
        refetch,
    } = props;
    const router = useRouter();
    const mpData = data.getAvailableMpToConnect;
    const [credentialsMp, setCredentialsMp] = React.useState({
        type: null,
        url: '',
    });
    const [mpActive, setMpActive] = React.useState({
        code: '',
        name: '',
    });

    // mutation
    const [registerMarketplaceChannel] = gqlService.registerMarketplaceChannel();
    const [updateMarketplaceLocation] = gqlService.updateMarketplaceLocation();
    const [reconnectMarketplaceChannel] = gqlService.reconnectMarketplaceChannel();
    const [disconnectMarketplaceChannel] = gqlService.disconnectMarketplaceChannel();

    const validationSchema = () => {
        let valObj = {};
        switch (mpActive.code) {
        case 'BLIB':
            valObj = {
                merchant_code: Yup.string().required('Required!'),
                signature_key: Yup.string().required('Required!'),
                api_seller_key: Yup.string().required('Required!'),
            };
            break;
        case 'JDID':
            valObj = {
                api_email: Yup.string().required('Required!'),
                application_key: Yup.string().required('Required!'),
                secret_key: Yup.string().required('Required!'),
            };
            break;
        case 'NTNID':
        case 'ORAMI':
        case 'SEHATQ':
        case 'KALCARE':
        case 'MNC':
            valObj = {
                shop_id: Yup.string().required('Required!'),
                shop_secret: Yup.string().required('Required!'),
            };
            break;
        case 'TKPD':
            valObj = {
                fs_id: Yup.number().required('Required!'),
                client_id: Yup.string().required('Required!'),
                client_secret: Yup.string().required('Required!'),
                shop_id: Yup.number().required('Required!'),
            };
            break;
        case 'ZLGO':
            valObj = {
                seller_id: Yup.string().required('Required!'),
                api_key: Yup.string().required('Required!'),
            };
            break;
        case 'ZLRA':
            valObj = {
                user_id: Yup.string().required('Required!'),
                api_key: Yup.string().required('Required!'),
            };
            break;
        default:
            break;
        }
        return valObj;
    };

    const initialValue = () => {
        let valObj = {};
        switch (mpActive.code) {
        case 'BLIB':
            valObj = {
                merchant_code: '',
                signature_key: '',
                api_seller_key: '',
            };
            break;
        case 'JDID':
            valObj = {
                api_email: '',
                application_key: '',
                secret_key: '',
            };
            break;
        case 'NTNID':
        case 'ORAMI':
        case 'SEHATQ':
            valObj = {
                shop_id: '',
                shop_secret: '',
            };
            break;
        case 'TKPD':
            valObj = {
                fs_id: '',
                client_id: '',
                client_secret: '',
                shop_id: '',
            };
            break;
        case 'ZLGO':
            valObj = {
                seller_id: '',
                api_key: '',
            };
            break;
        case 'ZLRA':
            valObj = {
                user_id: '',
                api_key: '',
            };
            break;
        default:
            break;
        }
        return valObj;
    };

    const handleSubmit = (input) => {
        const variables = { input };
        window.backdropLoader(true);
        registerMarketplaceChannel({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success register marketplace!',
                variant: 'success',
            });
            setTimeout(() => refetch(), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleUpdateLocation = () => {
        window.backdropLoader(true);
        updateMarketplaceLocation({
            variables: { store_id: router && router.query && Number(router.query.id) },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success register marketplace!',
                variant: 'success',
            });
            setTimeout(() => router.push(credentialsMp.url), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleDisconnect = (mp) => {
        window.backdropLoader(true);
        disconnectMarketplaceChannel({
            variables: {
                input: {
                    brand_id: mpData.brand_id,
                    marketplace_code: mp.marketplace_code,
                },
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success disconnect to marketplace!',
                variant: 'success',
            });
            setTimeout(() => refetch(), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleReconnect = (mp) => {
        window.backdropLoader(true);
        reconnectMarketplaceChannel({
            variables: {
                input: {
                    brand_id: mpData.brand_id,
                    marketplace_code: mp.marketplace_code,
                },
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success reconnect to marketplace!',
                variant: 'success',
            });
            setTimeout(() => refetch(), 250);
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
            location: [],
            ...initialValue(),
        },
        validationSchema: Yup.object().shape({
            location: Yup.array()
                .of(
                    Yup.object(),
                )
                .min(1)
                .required('Required!'),
            ...validationSchema(),
        }),
        onSubmit: (values) => {
            const { location, ...restValues } = values;
            const valueToSubmit = {
                brand_id: mpData.brand_id,
                loc_id: location.map((loc) => (Number(loc.loc_id))),
                marketplace_code: mpActive.code,
                credentials: '{}',
            };
            const credentials = {};
            const keys = Object.keys(restValues);
            if (keys.length) {
                keys.forEach((key) => {
                    let data_type = 'string';
                    let value = String(restValues[key]);
                    if (mpActive.code === 'TKPD' && (key === 'fs_id' || key === 'shop_id')) {
                        data_type = 'integer';
                        value = Number(restValues[key]);
                    }
                    credentials[key] = { data_type, value };
                });
                valueToSubmit.credentials = JSON.stringify(credentials);
            }
            if (credentialsMp.type === 'oauth2') {
                handleUpdateLocation();
            } else {
                handleSubmit(valueToSubmit);
            }
        },
    });

    const contentProps = {
        formik,
        mpData,
        dataLocation: dataLocation.getLocationList.items,
        mpActive,
        setMpActive,
        handleDisconnect,
        handleReconnect,
        setCredentialsMp,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const [updateConnectedMarketplace, { loading }] = gqlService.updateConnectedMarketplace({});
    const [getLocationList, { loading: loadingLocation, data: dataLocation }] = gqlService.getLocationList();
    const [getAvailableMpToConnect, { loading: loadingMp, data, refetch }] = gqlService.getAvailableMpToConnect({
        store_id: router && router.query && Number(router.query.id),
        callback_url: router && router.asPath,
    });

    React.useEffect(() => {
        updateConnectedMarketplace({
            variables: { store_id: router && router.query && Number(router.query.id) },
        }).then(() => {
            getLocationList();
            getAvailableMpToConnect();
        });
    }, []);

    if (loading || loadingMp || loadingLocation) {
        return (
            <Layout>
                <div style={{
                    display: 'flex',
                    color: '#435179',
                    fontWeight: 600,
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                >
                    Loading get Marketplaces . . .
                </div>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout>
                <div style={{
                    display: 'flex',
                    color: '#435179',
                    fontWeight: 600,
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                >
                    Data not found!
                </div>
            </Layout>
        );
    }

    const contentProps = {
        data,
        dataLocation,
        refetch,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
