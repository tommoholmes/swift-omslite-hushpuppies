/* eslint-disable func-names */
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            'next/babel',
        ],
        plugins: [
            [
                'module-resolver',
                {
                    root: [
                        '.',
                    ],
                    alias: {
                        '@root': './',
                        '@core': './core',
                        '@middlewares': './core/middlewares',
                        '@modules': './core/modules',
                        '@helpers': './core/helpers',
                        '@services': './core/services',
                        '@config': './swift.config.js',

                        '@next_headcustom': './core/nextjs_custom/HeadCustom',
                        '@next_nextscriptcustom': './core/nextjs_custom/NextScriptCustom',

                        '@middleware_route': './core/middlewares/route',

                        '@graphql_request': './core/api/graphql/request',

                        '@lib': './core/lib',
                        '@lib_apollo': './core/lib/apollo',
                        '@lib_gtag': './core/lib/gtag',
                        '@lib_firebase': './core/lib/firebase',
                        '@i18n': './core/lib/i18n',

                        '@layout': './core/modules/theme/layout',

                        // theme
                        '@theme': './core/theme',
                        '@theme_color': './core/theme/colors',
                        '@theme_mixins': './core/theme/mixins',
                        '@theme_theme': './core/theme/theme',
                        '@theme_typography': './core/theme/typography',
                        '@theme_vars': './core/theme/vars',

                        // helpers
                        '@helper_auth': './core/helpers/auth',
                        '@helper_checkcomponents': './core/helpers/checkComponent',
                        '@helper_config': './core/helpers/config',
                        '@helper_cookies': './core/helpers/cookies',
                        '@helper_currency': './core/helpers/currency',
                        '@helper_date': './core/helpers/date',
                        '@helper_encryption': './core/helpers/encryption',
                        '@helper_fonts': './core/helpers/fonts',
                        '@helper_generatequery': './core/helpers/generateQuery',
                        '@helper_getpath': './core/helpers/getPath',
                        // '@helper_noreload': './core/helpers/noReload',
                        '@helper_passwordstrength': './core/helpers/passwordStrength',
                        '@helper_regex': './core/helpers/regex',
                        '@helper_text': './core/helpers/text',
                        '@helper_theme': './core/helpers/theme',
                        '@helper_urlparser': './core/helpers/urlParser',
                        '@helper_zxcvbn': './core/helpers/zxcvbn',
                        '@helper_localstorage': './core/helpers/localstorage',

                        // commons
                        '@common_textfield': './core/modules/commons/TextField',
                        '@common_button': './core/modules/commons/Button',
                        '@common_table': './core/modules/commons/Table',
                        '@common_breadcrumb': './core/modules/commons/Breadcrumb',

                        // for example:
                        '@common_buttonqty': 'swift-pwa-core/core/modules/commons/ButtonQty',
                    },
                },
            ],
        ],
    };
};
