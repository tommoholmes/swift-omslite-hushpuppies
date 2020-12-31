import { gql } from '@apollo/client';

export const getLocationList = gql`
    query getLocationList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: LocationFilterInput,
        $sort: LocationSortInput,
    ){
        getLocationList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
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

export const getLocationById = gql`
    query getLocationById(
        $id: Int!,
    ){
        getLocationById(
            id: $id
        ){
            loc_id
            company {
                company_code
                company_id
                company_name
            }
            company_id
            loc_code
            loc_name
            loc_street
            loc_region
            loc_city
            loc_telephone
            loc_postcode
            loc_long
            loc_lat
            loc_zone
            is_warehouse
            use_in_frontend
            is_sirclo_warehouse
            is_virtual_location
            priority
            is_active
        }
    }
`;

export const createLocation = gql`
    mutation createLocation(
        $company_id: Int!,
        $loc_code: String!,
        $loc_name: String!,
        $loc_street: String!,
        $loc_region: String!,
        $loc_city: String!,
        $loc_telephone: String!,
        $loc_postcode: String!,
        $loc_long: String!,
        $loc_lat: String!,
        $loc_zone: String!,
        $is_warehouse: Int,
        $use_in_frontend: Int,
        $is_sirclo_warehouse: Int,
        $is_virtual_location: Int,
        $priority: Int,
        $is_active: Int,
    ){
        createLocation(
            input: {
                company_id: $company_id,
                loc_code: $loc_code,
                loc_name: $loc_name,
                loc_street: $loc_street,
                loc_region: $loc_region,
                loc_city: $loc_city,
                loc_telephone: $loc_telephone,
                loc_postcode: $loc_postcode,
                loc_long: $loc_long,
                loc_lat: $loc_lat,
                loc_zone: $loc_zone,
                is_warehouse: $is_warehouse,
                use_in_frontend: $use_in_frontend,
                is_sirclo_warehouse: $is_sirclo_warehouse,
                is_virtual_location: $is_virtual_location,
                priority: $priority,
                is_active: $is_active,
            }
        ){
            loc_id
            company_id
            loc_code
            loc_name
            loc_street
            loc_region
            loc_city
            loc_telephone
            loc_postcode
            loc_long
            loc_lat
            loc_zone
            is_warehouse
            use_in_frontend
            is_sirclo_warehouse
            is_virtual_location
            priority
            is_active
        }
    }
`;

export const updateLocation = gql`
    mutation updateLocation(
        $id: Int!,
        $company_id: Int!,
        $loc_code: String!,
        $loc_name: String!,
        $loc_street: String!,
        $loc_region: String!,
        $loc_city: String!,
        $loc_telephone: String!,
        $loc_postcode: String!,
        $loc_long: String!,
        $loc_lat: String!,
        $loc_zone: String!,
        $is_warehouse: Int,
        $use_in_frontend: Int,
        $is_sirclo_warehouse: Int,
        $is_virtual_location: Int,
        $priority: Int,
        $is_active: Int,
    ){
        updateLocation(
            id: $id,
            input: {
                company_id: $company_id,
                loc_code: $loc_code,
                loc_name: $loc_name,
                loc_street: $loc_street,
                loc_region: $loc_region,
                loc_city: $loc_city,
                loc_telephone: $loc_telephone,
                loc_postcode: $loc_postcode,
                loc_long: $loc_long,
                loc_lat: $loc_lat,
                loc_zone: $loc_zone,
                is_warehouse: $is_warehouse,
                use_in_frontend: $use_in_frontend,
                is_sirclo_warehouse: $is_sirclo_warehouse,
                is_virtual_location: $is_virtual_location,
                priority: $priority,
                is_active: $is_active,
            }
        ){
            loc_id
            company_id
            loc_code
            loc_name
            loc_street
            loc_region
            loc_city
            loc_telephone
            loc_postcode
            loc_long
            loc_lat
            loc_zone
            is_warehouse
            use_in_frontend
            is_sirclo_warehouse
            is_virtual_location
            priority
            is_active
        }
    }
`;

export const getCountries = gql`
    query{
        countries{
            full_name_english
            id
        }
    }
`;

export const getCountry = gql`
    query country(
        $id: String!,
    ){
        country(
            id: $id
        ){
            available_regions {
                code
                id
                name
            }
            id
        }
    }
`;

export const getCityListByRegionCode = gql`
    query getCityListByRegionCode(
        $regionCode: String!,
    ){
        getCityListByRegionCode(regionCode: $regionCode){
            items {
                city
                id
                value
            }
            total_count
        }
    }
`;

export const multideleteLocation = gql`
    mutation multideleteLocation (
        $id: [Int!]!
    ){
        multideleteLocation(
            id: $id
        )
    }
`;

export default {
    getLocationList,
    getLocationById,
    createLocation,
    updateLocation,
    getCountries,
    getCountry,
    getCityListByRegionCode,
    multideleteLocation,
};
