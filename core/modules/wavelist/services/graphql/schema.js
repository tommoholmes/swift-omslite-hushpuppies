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
query getPickByWaveById($id: Int!) {
    getPickByWaveById(id: $id) {
      pick_by_wave {
        entity_id
        finished_at
        items {
          entity_id
          sku
          is_confirmed
          bin_code
          qty_picked
          qty_to_pick
        }
        picked_by
        started_at
        status {
          label
          value
        }
        total_items
        total_shipments
      }
    }
  }
`;

export default {
    getPickByWaveList,
    getPickByWaveById,
};
