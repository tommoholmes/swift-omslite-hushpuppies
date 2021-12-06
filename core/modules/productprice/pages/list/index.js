import { withApollo } from '@lib_apollo';
import Content from '@modules/productprice/pages/list/components';
import Core from '@modules/productprice/pages/list/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

export default withApollo({ ssr: false })(Page);
