import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/warehouse/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getWarehouseList = (variables) => useLazyQuery(Schema.getWarehouseList, {
    variables, ...context, ...fetchPolicy,
});

export const getWarehouseById = (variables) => useQuery(Schema.getWarehouseById, {
    variables, ...context, ...fetchPolicy,
});

export const createWarehouse = (variables) => useMutation(Schema.createWarehouse, {
    variables, ...context,
});

export const updateWarehouse = (variables) => useMutation(Schema.updateWarehouse, {
    variables, ...context,
});

export const multideleteWarehouse = (variables) => useMutation(Schema.multideleteWarehouse, {
    variables, ...context,
});

export default {
    getWarehouseList,
    getWarehouseById,
    createWarehouse,
    updateWarehouse,
    multideleteWarehouse,
};
