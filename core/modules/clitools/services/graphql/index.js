import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from './schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getQueueList = (variables) => useLazyQuery(Schema.getQueueList, {
    variables, ...context, ...fetchPolicy,
});

export const getIcubeCommandLineList = (variables) => useLazyQuery(Schema.getIcubeCommandLineList, {
    variables, ...context, ...fetchPolicy,
});

export const addQueueJob = (variables) => useMutation(Schema.addQueueJob, {
    variables, ...context,
});

export default {
    getQueueList,
    getIcubeCommandLineList,
    addQueueJob,
};
