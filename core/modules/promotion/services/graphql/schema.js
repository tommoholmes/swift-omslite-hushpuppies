import { gql } from '@apollo/client';

export const getPromotionList = gql`
    query getPromotionList(
        $pageSize: Int,
        $currentPage: Int,
        $filter: PromotionFilterInput,
        $sort: PromotionSortInput,
    ){
        getPromotionList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items{
                id
                all_product_qty
                created_at
                description
                from_date
                max_promotion
                method
                multiple_price
                multiplication
                name
                status
                to_date
                type
                updated_at
                promotion_applied
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
`;

export const updateStatusPromotion = gql`
    mutation updateStatusPromotion(
        $input: PromotionUpdateStatus!
    ){
        updateStatusPromotion(
            input: $input
        )
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export const importPromotion = gql`
    mutation importPromotion($binary: String!) {
        importPromotion(input: { binary: $binary })
    }
`;

export const getCompanyOptions = gql`
query{
    getCompanyOptions{
      value
      label
    }
  }
`;

export const getLocationList = gql`
query getLocationList($filter: LocationFilterInput) {
    getLocationList(
      pageSize: 0
      currentPage: 1
      filter: $filter
    ) {
      items {
        company_id
        loc_id
        loc_name
      }
    }
  }
`;

export const addPromotion = gql`
    mutation addPromotion($input: PromotionInput!) {
        addPromotion(input: $input)
    }
`;

export const massDeletePromotion = gql`
    mutation massDeletePromotion($id: [Int]!) {
        massDeletePromotion(id: $id)
    }
`;

export const exportPromotion = gql`
    mutation exportPromotion($id: [Int]) {
        exportPromotion(id: $id)
    }
`;

export const savePromotion = gql`
    mutation savePromotion($input: PromotionInput!) {
        savePromotion(input: $input)
    }
`;

export const getPromotionById = gql`
    query getPromotionById($id: Int!){
        getPromotionById(id: $id){
            all_product_qty
            channel
            description
            from_date
            id
            loc_code
            loc_name
            max_promotion
            max_promotion_type
            method
            multiple_price
            multiplication
            single_total_price
            name
            product_free_lines{
                id
                max_total_price
                min_total_price
                qty
                sku
              }
              product_lines{
                id
                qty
                sku
              }
            status
            to_date
            type
        }
    }
`;

export const isPromotionSkuExist = gql`
    query isPromotionSkuExist($sku: String!, $type: String!){
        isPromotionSkuExist(sku: $sku, type: $type){
            attribute_code
            skip_gimmick
            sku
            value
        }
    }
`;

export const getPromotionChannelsByLocId = gql`
query getPromotionChannelsByLocId($location_id: Int!){
    getPromotionChannelsByLocId(location_id: $location_id){
      channel_id
      channel_name
    }
  }
`;

export default {
    getPromotionList,
    updateStatusPromotion,
    downloadSampleCsv,
    importPromotion,
    getCompanyOptions,
    getLocationList,
    addPromotion,
    massDeletePromotion,
    exportPromotion,
    savePromotion,
    getPromotionById,
    isPromotionSkuExist,
    getPromotionChannelsByLocId,
};
