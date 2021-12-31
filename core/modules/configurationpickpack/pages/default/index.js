// import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationpickpack/pages/default/components';
import Core from '@modules/configurationpickpack/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

export default withApollo({ ssr: false })(Page);
