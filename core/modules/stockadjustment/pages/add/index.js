import Content from '@modules/stockadjustment/pages/add/components';
import Core from '@modules/stockadjustment/pages/add/core';
import { withApollo } from '@lib/apollo';

export const Page = (props) => <Core Content={Content} {...props} />;

export default withApollo({ ssr: false })(Page);
