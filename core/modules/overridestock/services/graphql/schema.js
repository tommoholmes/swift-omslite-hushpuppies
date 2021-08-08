import { gql } from '@apollo/client';

const overrideStock = `
    entity_id
    vs_id{
        vs_id
        vs_name
    }
    sku
    qty
    reason
`;

export const getVirtualStockQuantityList = gql`
    query getVirtualStockQuantityList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: VirtualStockQuantityFilterInput,
        $sort: VirtualStockQuantitySortInput,
    ){
        getVirtualStockQuantityList(
            pageSize: $pageSize,
            currentPage: $currentPage
            filter: $filter,
            sort: $sort,
        ){
            items {
                entity_id
                vs_id {
                    vs_id
                    vs_name
                }
                sku
                qty
                reason
            }
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;

export const getVirtualStockQuantityById = gql`
    query getVirtualStockQuantityById(
        $id: Int!,
    ){
        getVirtualStockQuantityById(
            id: $id
        ){
            ${overrideStock}
        }
    }
`;

export const createVirtualStockQuantity = gql`
    mutation createVirtualStockQuantity(
        $vs_id: Int,
        $sku: String,
        $qty: Int,
        $reason: String,
    ){
        createVirtualStockQuantity(
            input: {
                vs_id: $vs_id,
                sku: $sku,
                qty: $qty,
                reason: $reason,
            }
        ){
            ${overrideStock}
        }
    }
`;

export const updateVirtualStockQuantity = gql`
    mutation updateVirtualStockQuantity(
        $id: Int!,
        $vs_id: Int,
        $sku: String,
        $qty: Int,
        $reason: String,
    ){
        updateVirtualStockQuantity(
            id: $id,
            input: {
                vs_id: $vs_id,
                sku: $sku,
                qty: $qty,
                reason: $reason,
            }
        ){
            ${overrideStock}
        }
    }
`;

export const uploadSource = gql`
    mutation uploadSource(
        $binary: String!,
    ){
        uploadSource(
            input: {
                binary: $binary,
            }
        )
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv(
        $type: String!,
    ){
        downloadSampleCsv(
            type: $type,
        )
    }
`;

export default {
    getVirtualStockQuantityList,
    getVirtualStockQuantityById,
    createVirtualStockQuantity,
    updateVirtualStockQuantity,
    uploadSource,
    downloadSampleCsv,
};
