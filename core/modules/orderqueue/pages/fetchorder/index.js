import { withApollo } from '@lib_apollo';
import Content from '@modules/orderqueue/pages/fetchorder/components';
import Core from '@modules/orderqueue/pages/fetchorder/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

export default withApollo({ ssr: false })(Page);
