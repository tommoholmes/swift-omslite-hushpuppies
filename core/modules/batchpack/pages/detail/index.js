import { withApollo } from '@lib_apollo';
import Content from '@modules/batchpack/pages/detail/components';
import Core from '@modules/batchpack/pages/detail/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

export default withApollo({ ssr: false })(Page);
