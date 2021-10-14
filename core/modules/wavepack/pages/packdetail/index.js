import { withApollo } from '@lib_apollo';
import Content from '@modules/wavepack/pages/packdetail/components';
import Core from '@modules/wavepack/pages/packdetail/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

export default withApollo({ ssr: false })(Page);
