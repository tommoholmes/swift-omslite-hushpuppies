// import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/vendorbulktools/pages/tutorialupload/components';
import Core from '@modules/vendorbulktools/pages/tutorialupload/core';

const Page = (props) => <Core Content={Content} {...props} />;

export default withApollo({ ssr: false })(Page);
