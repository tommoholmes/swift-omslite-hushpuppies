// import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/stocktransfer/pages/detailupload/components';
import Core from '@modules/stocktransfer/pages/detailupload/core';

const Page = (props) => <Core Content={Content} {...props} />;

export default withApollo({ ssr: false })(Page);
