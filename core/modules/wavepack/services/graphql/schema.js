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

export const getPickByWavePacklist = gql`
    query getPickByWavePacklist($id: Int!) {
        getPickByWavePacklist(id: $id) {
        pick_by_wave {
            entity_id
            status {
            value
            label
            }
            started_at
            finished_at
            picked_by
            total_shipments
            total_items
            packlist {
                shipment_id
                shipment_inc_id
                slot_no
                status {
                    value
                    label
                }
            }
        }
        }
    }
`;

export const startPickByWavePacking = gql`
    mutation startPickByWavePacking($id: Int!) {
        startPickByWavePacking(id: $id) {
        pick_by_wave {
            entity_id
        }
        }
    }
`;

export const getPackList = gql`
query getPackList($id: [Int!]!) {
    getPackList(id: $id) {
      data {
        increment_id
        channel_order_increment_id
        status {
          value
          label
        }
        shipping_address {
          firstname
          lastname
          street
          city
          region
          postcode
          country_id
          country_name
          telephone
        }
        channel_shipping_label
        items {
          name
          sku
          qty
          image_url
          qty_picked
          qty_packed
        }
        slot_no
        pick_id
      }
    }
  }
`;

export const donePickByWavePacking = gql`
mutation donePickByWavePacking($id: Int!, $shipment_id: Int!) {
    donePickByWavePacking(id: $id, shipment_id: $shipment_id) {
      next_shipment_id_to_pack
    }
  }
`;

export default {
    getPickByWaveList,
    getPickByWavePacklist,
    getPackList,
    donePickByWavePacking,
};
