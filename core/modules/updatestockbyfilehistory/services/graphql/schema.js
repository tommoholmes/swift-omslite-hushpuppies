import { gql } from '@apollo/client';

export const getFileHistoryTypes = gql`
    query {
        getFileHistoryTypes {
            type
            title
        }
    }
`;

export const getUpdateStockByFileHistoryList = gql`
    query getUpdateStockByFileHistoryList($type: String!) {
        getUpdateStockByFileHistoryList(type: $type)
    }
`;

export default {
    getFileHistoryTypes,
    getUpdateStockByFileHistoryList,
};
