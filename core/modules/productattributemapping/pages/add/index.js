// import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/productattributemapping/pages/add/components';
import Core from '@modules/productattributemapping/pages/add/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

export default withApollo({ ssr: false })(Page);
