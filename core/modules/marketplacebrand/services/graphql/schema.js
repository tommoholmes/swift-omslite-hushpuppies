import { gql } from '@apollo/client';

export const getStoreList = gql`
    query getStoreList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: StoreFilterInput,
        $sort: StoreSortInput
    ){
        getStoreList(
            pageSize: $pageSize,
            currentPage: $currentPage
            filter: $filter
            sort: $sort
        ){
            items {
                id
                channel_store_id
                name
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

export const registerMarketplaceBrand = gql`
    mutation registerMarketplaceBrand(
        $brand_id: String!
        $brand_name: String!
    ){
        registerMarketplaceBrand(
            input: {
                brand_id: $brand_id,
                brand_name: $brand_name,
            },
        )
    }
`;

export const getAvailableMpToConnect = gql`
    query getAvailableMpToConnect($store_id: Int!){
        getAvailableMpToConnect(store_id: $store_id, callback_url: ""){
            brand_id
            store_id
            marketplaces {
                config {
                    data_type
                    id
                    store_detail_id
                    type
                    value
                  }
                credentials {
                    channel_code
                    channel_name
                    fields
                    type
                    url
                    url_info {
                        url_channel
                        url_help_page
                        url_logo_channel
                        url_oauth2
                        url_square_logo_channel
                      }
                  }
                image_path
                image_url
                marketplace_code
                marketplace_name
                status
              }
        }
    }
`;

export default {
    getStoreList,
    registerMarketplaceBrand,
    getAvailableMpToConnect,
};
