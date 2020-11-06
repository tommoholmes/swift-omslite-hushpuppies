/* eslint-disable no-param-reassign */
const requestGraph = require('../request');
const { encrypt } = require('../../../helpers/encryption');

const query = `mutation getToken(
        $email: String!,
        $password: String!,
    ) {
        generateCustomerTokenCustom(email: $email, password: $password){
        token
        }
    }
`;

const internalGenerateCustomerToken = async (parent, { email, password }, context) => {
    const res = await requestGraph(query, { email, password }, context);
    // context.session.destroy();
    if (res.generateCustomerTokenCustom) {
        context.session.token = encrypt(res.generateCustomerTokenCustom.token);
        return {
            originalToken: res.generateCustomerTokenCustom.token,
            token: encrypt(res.generateCustomerTokenCustom.token),
            message: 'welcome',
        };
    }
    return res;
};

module.exports = internalGenerateCustomerToken;
