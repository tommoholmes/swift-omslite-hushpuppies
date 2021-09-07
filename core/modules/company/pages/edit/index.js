// import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/company/pages/edit/components';
import Core from '@modules/company/pages/edit/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

// Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home'] });
// export default withApollo({ ssr: false })(withTranslation()(Page));

export default withApollo({ ssr: false })(Page);
