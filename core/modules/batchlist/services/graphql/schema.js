import { gql } from '@apollo/client';

export const getPickByBatchList = gql`
    query getPickByBatchList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: PickByBatchFilterInput,
        $sort: PickByBatchSortInput,
    ){
        getPickByBatchList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                entity_id
                created_at
                status{
                    label
                    value
                }
                created_by
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

export const getPickByBatchById = gql`
    query getPickByBatchById(
        $id: Int!,
    ){
        getPickByBatchById(
            id: $id
        ){
            pick_by_batch{
                entity_id
                status {
                    label
                    value
                }
                created_at
                total_shipments
                total_items
                picklist {
                    parent_id
                    entity_id
                    total_items
                    picked_by
                    status{
                        value
                    }
                }
            }
        }
    }
`;

export const getPickByBatchPicklist = gql`
    query getPickByBatchPicklist(
        $id: Int!,
    ){
        getPickByBatchPicklist(
            id: $id
        ){
            pick_by_batch_picklist {
                parent_id
                entity_id
                status {
                    label
                    value
                }
                started_at
                total_items
                picked_by
                items {
                    parent_id
                    entity_id
                    sku
                    qty_picked
                    qty_to_pick
                    bin_code
                    barcode        
                    is_confirmed
                    name
                    sort_no
                }
            }
        }
    }
`;

export default {
    getPickByBatchList,
    getPickByBatchById,
    getPickByBatchPicklist,
};
