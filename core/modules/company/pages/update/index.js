// import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import CreateContent from './components/create';
import EditContent from './components/edit';
import Core from './core';

const Page = (props) => (
    <Core
        CreateContent={CreateContent}
        EditContent={EditContent}
        {...props}
    />
);

// Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home'] });
// export default withApollo({ ssr: false })(withTranslation()(Page));

export default withApollo({ ssr: false })(Page);
