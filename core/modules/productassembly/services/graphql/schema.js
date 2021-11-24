import { gql } from '@apollo/client';

export const getProductAssemblyList = gql`
    query getProductAssemblyList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: ProductAssemblyFilterInput,
        $sort: ProductAssemblySortInput,
    ){
        getProductAssemblyList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                sku
                assembly_item_sku
                last_updated
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

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv(
        $type: String!,
    ){
        downloadSampleCsv(
            type: $type,
        )
    }
`;

export const uploadProductAssembly = gql`
mutation uploadProductAssembly(
    $binary: String!,
){
    uploadProductAssembly(
        input: {
            binary: $binary,
        }
    )
}
`;

export default {
    getProductAssemblyList,
    downloadSampleCsv,
    uploadProductAssembly,
};
