// import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/dashboard/pages/default/components';
import Core from '@modules/dashboard/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

// Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home'] });
// export default withApollo({ ssr: true })(withTranslation()(Page));

export default withApollo({ ssr: false })(Page);
