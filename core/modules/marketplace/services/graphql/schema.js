import { gql } from '@apollo/client';

export const getMarketplaceList = gql`
    query getMarketplaceList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: MarketplaceFilterInput,
        $sort: MarketplaceSortInput,
    ){
        getMarketplaceList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                marketplace_code
                marketplace_name
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

export default {
    getMarketplaceList,
};
