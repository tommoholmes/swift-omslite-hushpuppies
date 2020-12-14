import { gql } from '@apollo/client';

export const getPriorityLocationList = gql`
    query getPriorityLocationList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getPriorityLocationList(
            pageSize: $pageSize,
            currentPage: $currentPage,
        ){
            items {
                id
                channel_code
                province
                city
                priority
                loc_code
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

export const getPriorityLocationById = gql`
    query getPriorityLocationById(
        $id: Int!,
    ){
        getPriorityLocationById(
            id: $id
        ){
            id
            channel_code
            province
            city
            priority
            loc_code
        }
    }
`;

export const createPriorityLocation = gql`
    mutation createPriorityLocation(
        $channel_code: String,
        $city: String,
        $loc_code: String,
        $priority: String,
    ){
        createPriorityLocation(
            input: {
                channel_code: $channel_code,
                city: $city,
                loc_code: $loc_code,
                priority: $priority,
            }
        ){
            channel_code
            city
            loc_code
            priority
        }
    }
`;

export const updatePriorityLocation = gql`
    mutation updatePriorityLocation(
        $id: Int!,
        $channel_code: String,
        $city: String,
        $loc_code: String,
        $priority: String,
    ){
        updatePriorityLocation(
            id: $id,
            input: {
                channel_code: $channel_code,
                city: $city,
                loc_code: $loc_code,
                priority: $priority,
            }
        ){
            channel_code
            city
            loc_code
            priority
        }
    }
`;

export const getChannelList = gql`
    query getChannelList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getChannelList(
            pageSize: $pageSize,
            currentPage: $currentPage,
        ){
            items {
                channel_id
                channel_code
                channel_name
                channel_url
                token
                framework
                rule_type
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

export const getCityList = gql`
    query{
        getCityList{
            id
            label
            value
        }
    }
`;

export const getLocationList = gql`
    query getLocationList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getLocationList(
            pageSize: $pageSize,
            currentPage: $currentPage
        ){
            items {
                loc_id
                loc_code
                loc_name
                loc_city
                loc_street
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

export const deletePriorityLocation = gql`
    mutation deletePriorityLocation (
        $id: Int!
    ){
        deletePriorityLocation(
            id: $id
        )
    }
`;

export const multideletePriorityLocation = gql`
    mutation multideletePriorityLocation (
        $id: [Int!]!
    ){
        multideletePriorityLocation(
            id: $id
        )
    }
`;

export default {
    getPriorityLocationList,
    getPriorityLocationById,
    createPriorityLocation,
    updatePriorityLocation,
    getChannelList,
    getCityList,
    getLocationList,
    deletePriorityLocation,
    multideletePriorityLocation,
};
