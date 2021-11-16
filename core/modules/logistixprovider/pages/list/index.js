import { withApollo } from '@lib_apollo';
import Content from '@modules/logistixprovider/pages/list/components';
import Core from '@modules/logistixprovider/pages/list/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

export default withApollo({ ssr: false })(Page);
