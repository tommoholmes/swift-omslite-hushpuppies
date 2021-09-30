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
                created_by
                total_items
                total_shipments
                picklist {
                    parent_id
                    entity_id
                    status{
                        value
                    }
                    picked_by
                    total_items
                    items {
                        barcode
                        bin_code
                        entity_id
                        parent_id
                        qty_picked
                        qty_to_pick
                        sku
                        sort_no
                    }
                }
            }
        }
    }
`;

export default {
    getPickByBatchList,
    getPickByBatchById,
};
