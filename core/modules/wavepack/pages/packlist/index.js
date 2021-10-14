import { withApollo } from '@lib_apollo';
import Content from '@modules/wavepack/pages/packlist/components';
import Core from '@modules/wavepack/pages/packlist/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

export default withApollo({ ssr: false })(Page);
