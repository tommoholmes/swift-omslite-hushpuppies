// import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/batchcreate/pages/default/components';
import Core from '@modules/batchcreate/pages/default/core';

const Page = (props) => <Core Content={Content} {...props} />;

export default withApollo({ ssr: false })(Page);
