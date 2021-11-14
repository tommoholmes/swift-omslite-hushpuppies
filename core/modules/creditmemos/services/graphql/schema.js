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
            items{
                creditmemo{
                    entity_id
                    increment_id
                    created_at
                    billing_name
                    state
                    state_name
                    grand_total
                }
                order{
                    channel_order_increment_id
                    channel_order_date
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

export const getCreditMemoById = gql`
    query getCreditMemoById(
        $id: Int!,
    ){
        getCreditMemoById(
            id: $id
        ){
            order{
                entity_id
                channel_order_date
                status
                status_label
                channel_order_increment_id
                channel_code
                channel_name
                customer_name
                customer_email
                customer_group
                billing_address{
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
                shipping_address{
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
                channel_payment_method
                channel_shipping_method
                shipping_amount
              }
              creditmemo{
                items{
                  discount_amount
                  order_item{
                    qty_ordered
                    qty_invoiced
                    qty_shipped
                    qty_refunded
                    qty_canceled
                  }
                  price
                  qty_to_refund
                  row_total
                  sku
                  tax_amount
                  total_amount
                }
                subtotal
                discount
                shipping_amount
                adjustment_refund
                adjustment_fee
                grand_total
              }
        }
    }
`;

export const createCreditmemo = gql`
    mutation createCreditmemo(
        $request_id: Int!,
        $input: CreditmemoInput!,
    ){
        createCreditmemo(
            request_id: $request_id,
            input: $input
        )
    }
`;

export const prepareNewMemo = gql`
    query prepareNewMemo($request_id: Int!) {
        prepareNewMemo(request_id: $request_id) {
        order {
            entity_id
            channel_order_date
            status
            status_label
            channel_order_increment_id
            channel_code
            channel_name
            customer_name
            customer_email
            customer_group
            billing_address {
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
            channel_payment_method
            channel_shipping_method
            shipping_amount
        }
        creditmemo {
            items {
                sku
                price
                order_item{
                  qty_ordered
                  qty_invoiced
                  qty_shipped
                  qty_refunded
                  qty_canceled
                }
                qty_to_refund
                row_total
                tax_amount
                discount_amount
                total_amount
            }
            subtotal
            discount
            shipping_amount
            adjustment_refund
            adjustment_fee
            grand_total
        }
        }
    }  
`;

export const calculateCreditMemoTotals = gql`
    mutation calculateCreditMemoTotals(
        $request_id: Int!,
        $input: CreditmemoInput!,
    ){
        calculateCreditMemoTotals(
            request_id: $request_id,
            input: $input
        ) {
            grand_total
        }
    }
`;

export default {
    getCreditMemoList,
    getCreditMemoById,
    createCreditmemo,
    prepareNewMemo,
    calculateCreditMemoTotals,
};
