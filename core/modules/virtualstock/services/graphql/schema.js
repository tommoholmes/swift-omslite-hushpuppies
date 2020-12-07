import { gql } from '@apollo/client';

export const getVirtualStockList = gql`
    query getVirtualStockList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getVirtualStockList(
            pageSize: $pageSize,
            currentPage: $currentPage
        ){
            items {
                vs_id
                vs_name
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

export const getVirtualStockById = gql`
    query getVirtualStockById(
        $id: Int!,
    ){
        getVirtualStockById(
            id: $id
        ){
            vs_id
            vs_name
            notes
            is_priority_enable
            location{
                loc_id
                loc_code
                loc_name
            }
        }
    }
`;

export const createVirtualStock = gql`
    mutation createVirtualStock(
        $vs_name: String!,
        $notes: String,
        $location: [AssignLocation],
    ){
        createVirtualStock(
            input: {
                vs_name: $vs_name,
                notes: $notes,
                location: $location,
            }
        ){
            vs_name
            notes
            location{
                loc_id
                loc_code
                loc_name
            }
        }
    }
`;

export const updateVirtualStock = gql`
    mutation updateVirtualStock(
        $id: Int!,
        $vs_name: String!,
        $notes: String,
        $location: [AssignLocation],
    ){
        updateVirtualStock(
            id: $id,
            input: {
                vs_name: $vs_name,
                notes: $notes,
                location: $location,
            }
        ){
            vs_name
            notes
            location{
                loc_id
                loc_code
                loc_name
            }
        }
    }
`;

export const getLocationList = gql`
    query getLocationList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getLocationList(
            pageSize: $pageSize,
            currentPage: $currentPage
        ){
            items {
                loc_id
                loc_code
                loc_name
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

export const deleteVirtualStock = gql`
    mutation deleteVirtualStock (
        $id: Int!
    ){
        deleteVirtualStock(
            id: $id
        )
    }
`;

export const multideleteVirtualStock = gql`
    mutation multideleteVirtualStock (
        $id: [Int!]!
    ){
        multideleteVirtualStock(
            id: $id
        )
    }
`;

export default {
    getVirtualStockList,
    getVirtualStockById,
    createVirtualStock,
    updateVirtualStock,
    getLocationList,
    deleteVirtualStock,
    multideleteVirtualStock,
};
