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
        $data: [promotionId!]!
    ){
        updateStatusPromotion(
            data: $data
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

export const getLocationOptions = gql`
query{
    getLocationOptions{
      value
      label
    }
  }
`;

export const getChannelOptions = gql`
    query{
        getChannelOptions
        {
            label
            value
        }
    }
`;

export const addPromotion = gql`
    mutation addPromotion($input: PromotionInput!) {
        addPromotion(input: $input)
    }
`;

export default {
    getPromotionList,
    updateStatusPromotion,
    downloadSampleCsv,
    importPromotion,
    getCompanyOptions,
    getLocationOptions,
    getChannelOptions,
    addPromotion,
};
