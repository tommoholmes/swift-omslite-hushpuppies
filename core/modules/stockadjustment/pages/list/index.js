import Content from '@modules/stockadjustment/pages/list/components';
import Core from '@modules/stockadjustment/pages/list/core';
import { withApollo } from '@lib/apollo';

export const Page = (props) => <Core Content={Content} {...props} />;

export default withApollo({ ssr: false })(Page);
