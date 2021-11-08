import { gql } from '@apollo/client';

const queryPickList = `
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
    finished_at
    total_items_left_to_pick
`;

const queryItemDetail = `
    parent_id
    entity_id
    name
    sku
    bin_code
    image_url
    qty_to_pick
    barcode
    is_confirmed
    qty_picked
    sort_no
`;

export const getPickByBatchStatus = gql`
    query{
        getPickByBatchStatus{
            value
            label
        }
    }
`;

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

export const startPickByBatchPicklist = gql`
    mutation startPickByBatchPicklist(
        $id: Int!,
    ){
        startPickByBatchPicklist(
            id: $id
        ){
            pick_by_batch_picklist {
                ${queryPickList}
            }
        }
    }
`;

export const donePickByBatchPicklist = gql`
    mutation donePickByBatchPicklist(
        $id: Int!,
    ){
        donePickByBatchPicklist(
            id: $id
        ){
            pick_by_batch_picklist {
                ${queryPickList}
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
                ${queryPickList}
            }
        }
    }
`;

export const getPickByBatchItemById = gql`
    query getPickByBatchItemById(
        $id: Int!,
    ){
        getPickByBatchItemById(
            id: $id
        ){
            pick_by_batch_item {
                ${queryItemDetail}
            }
        }
    }
`;

export const updatePickByBatchItem = gql`
    mutation updatePickByBatchItem(
        $item_id: Int!,
        $qty_picked: Int!,
    ){
        updatePickByBatchItem(
            item_id: $item_id,
            qty_picked: $qty_picked
        ){
            pick_by_batch_item {
                ${queryItemDetail}
            }
        }
    }
`;

export const startSortingPickByBatch = gql`
    mutation startSortingPickByBatch(
        $batch_id: Int!,
    ){
        startSortingPickByBatch(
            batch_id: $batch_id
        )
    }
`;

export const itemSortingPickByBatch = gql`
    mutation itemSortingPickByBatch(
        $batch_id: Int!,
        $barcode: String!,
    ){
        itemSortingPickByBatch(
            batch_id: $batch_id,
            barcode: $barcode
        ){
            pick_by_batch_sort {
                barcode
                bin_code
                entity_id
                name
                parent_id
                qty_packed
                qty_picked
                qty_to_pick
                shipment_id
                sku
                slot_no
                sort_no
                sorted_by
            }
        }
    }
`;

export const doneSortingPickByBatch = gql`
    mutation doneSortingPickByBatch(
        $batch_id: Int!,
    ){
        doneSortingPickByBatch(
            batch_id: $batch_id
        ){
            pick_by_batch {
                entity_id
            }
        }
    }
`;

export const getStoreConfigSorting = gql`
    query{
        getStoreConfig(path: "swiftoms_pickpack/batch/sorting_method")
    }
`;

export const multipleItemSortingPickByBatch = gql`
    mutation multipleItemSortingPickByBatch(
        $batch_id: Int!
        $barcode: String!
    ){
    multipleItemSortingPickByBatch(
      batch_id: $batch_id
      barcode: $barcode
    ){
      slot_no
      shipment_id
      slot_no
      qty
      name
    }
  }
`;

export const getStoreConfig = gql`
  query{
    getStoreConfig(path: "swiftoms_pickpack/batch/allow_manual_confirm_pick")
  }
`;

export default {
    getPickByBatchStatus,
    getPickByBatchList,
    getPickByBatchById,
    startPickByBatchPicklist,
    donePickByBatchPicklist,
    getPickByBatchPicklist,
    getPickByBatchItemById,
    updatePickByBatchItem,
    startSortingPickByBatch,
    itemSortingPickByBatch,
    doneSortingPickByBatch,
    getStoreConfigSorting,
    multipleItemSortingPickByBatch,
    getStoreConfig,
};
