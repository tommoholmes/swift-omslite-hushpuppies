// import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/productbin/pages/list/components';
import Core from '@modules/productbin/pages/list/core';

const Page = (props) => <Core Content={Content} {...props} />;

export default withApollo({ ssr: false })(Page);
