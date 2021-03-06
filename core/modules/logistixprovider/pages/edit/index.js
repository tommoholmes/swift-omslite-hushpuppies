import { withApollo } from '@lib_apollo';
import Content from '@modules/logistixprovider/pages/edit/components';
import Core from '@modules/logistixprovider/pages/edit/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

export default withApollo({ ssr: false })(Page);
