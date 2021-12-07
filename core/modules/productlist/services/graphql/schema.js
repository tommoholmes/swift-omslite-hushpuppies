import { gql } from '@apollo/client';

const productList = `
    items {
        entity_id
        product_name
        sku
        product_price
        product_special_price
        product_status {
        label
        }
    }
    total_count
    page_info {
        page_size
        current_page
        total_pages
    }
`;

export const getProductList = gql`
    query getProductList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: ProductFilterInput,
        $sort: ProductSortInput,
    ){
        getProductList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            ${productList}
        }
    }
`;

export const getProductById = gql`
    query getProductById(
        $id: Int!,
    ){
        getProductById(
            id: $id
        ){
            id
            product_status {
                value
                label
            }
            attribute_set_name
            name
            sku
            price_range {
            maximum_price {
                regular_price {
                        value
                    }
                }
            }
            special_price
            special_from_date
            special_to_date
            weight
            visibility
            description {
                html
            }
            sourcing{
                loc_name
                qty_total
                qty_reserved
                qty_saleable
            }
        }
    }
`;

export const updateProduct = gql`
    mutation updateProduct(
        $id: Int!,
        $input: [ProductInput],
        $input_image: [String],
    ){
        updateProduct(
            id: $id,
            input: $input,
            input_image: $input_image,
        )
    }
`;

export const uploadSource = gql`
    mutation uploadSource(
        $binary: String!,
    ){
        uploadSource(
            input: {
                binary: $binary,
            }
        )
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv(
        $type: String!,
    ){
        downloadSampleCsv(
            type: $type,
        )
    }
`;

export const getProductListBySku = gql`
    query getProductList(
        $pageSize: Int!,
        $currentPage:Int!,
        $querySearch: String,
    ){
        getProductList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter:{
                sku:{
                    like: $querySearch
                }
            },
        ){
            ${productList}
        }
    }
`;

export const getProductAttributes = gql`
query getProductAttributes($id: Int!, $attribute_set_id: Int){
    getProductAttributes(id: $id, attribute_set_id: $attribute_set_id){
      entity_id
      attribute_set_id
      attribute_set_options{
        value
        label
      }
      groups{
        attribute_group_id
        attribute_group_name
        attribute_group_code
        sort_order
        attributes{
          attribute_code
          frontend_label
          frontend_input
          is_required
          is_readonly
          attribute_value
          attribute_options{
            value
            label
          }
          images
        }
      }
      sourcing{
        source_id
        loc_id
        loc_name
        company_id
        company_name
        sku
        qty_total
        qty_reserved
        qty_incoming
        qty_saleable
        qty_buffer
        priority
      }
      vendor_price{
        vendor{
          company_id
          company_name
        }
        price{
          location{
            loc_id
            loc_name
          }
          price
          special_price
        }
      }
    }
  }
`;

export const productFetchManual = gql`
  mutation productFetchManual{
    productFetchManual
  }
`;

export default {
    getProductList,
    getProductById,
    updateProduct,
    uploadSource,
    downloadSampleCsv,
    getProductListBySku,
    getProductAttributes,
    productFetchManual,
};
