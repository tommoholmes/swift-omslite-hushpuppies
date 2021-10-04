import { gql } from '@apollo/client';

export const getPickByWaveList = gql`
    query getPickByWaveList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: PickByWaveFilterInput,
        $sort: PickByWaveSortInput,
    ){
        getPickByWaveList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                entity_id
                started_at
                picked_by
                status{
                    label
                    value
                }
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

export const getPickByWaveById = gql`
    query getPickByWaveById(
        $id: Int!,
    ){
        getPickByWaveById(
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

export default {
    getPickByWaveList,
    getPickByWaveById,
};
