import React from 'react';
import Layout from '@layout';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const [code, setCode] = React.useState();
    const [name, setName] = React.useState();
    const [createCompany] = gqlService.createCompany();
    const handleSubmit = () => {
        const variables = { company_code: code, company_name: name };
        createCompany({
            variables,
        }).then((res) => {
            console.log(res);
            // need show succes message
        }).catch((e) => {
            alert(e);
        });
    };

    const contentProps = {
        code,
        setCode,
        name,
        setName,
        handleSubmit,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
