import { useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/updatestockbyfilehistory/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

export const getFileHistoryTypes = (variables) => useLazyQuery(Schema.getFileHistoryTypes, {
    variables,
    ...context,
});

export const getUpdateStockByFileHistoryList = (variables) => useLazyQuery(Schema.getUpdateStockByFileHistoryList, {
    variables,
    ...context,
});

export default {
    getFileHistoryTypes,
    getUpdateStockByFileHistoryList,
};
