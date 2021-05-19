import { gql } from '@apollo/client';

export const getCreditMemoList = gql`
    query getCreditMemoList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: CreditMemoFilterInput,
        $sort: CreditMemoSortInput,
    ){
        getCreditMemoList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                increment_id
                created_at
                order_id
                channel_order
                order_date
                bill_to_name
                status
                base_grand_total
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

export const getCreditMemoById = gql`
    query getCreditMemoById(
        $id: Int!,
    ){
        getCreditMemoById(
            id: $id
        ){
            order_id
            order_date
            bill_to_name
            status
            channel_order
            billing_address {
                firstname
                lastname
                street
                city
                region
                postcode
                country_id
                telephone
            }   
            shipping_address {
                firstname
                lastname
                street
                city
                region
                postcode
                country_id
                telephone
            }
            creditmemo_items {
                name
                sku
                price
                qty
                base_tax_amount
                base_discount_amount 
            }
            base_grand_total
        }
    }
`;

export default {
    getCreditMemoList,
    getCreditMemoById,
};
