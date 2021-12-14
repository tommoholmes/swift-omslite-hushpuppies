import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/irispayoutapproval/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getVendorIrisPayoutApprovalList = (variables) => useLazyQuery(Schema.getVendorIrisPayoutApprovalList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const vendorIrisPayoutApprove = (variables) => useMutation(Schema.vendorIrisPayoutApprove, {
    variables,
    ...context,
});

export const vendorIrisPayoutReject = (variables) => useMutation(Schema.vendorIrisPayoutReject, {
    variables,
    ...context,
});

export default {
    getVendorIrisPayoutApprovalList,
    vendorIrisPayoutApprove,
    vendorIrisPayoutReject,
};
