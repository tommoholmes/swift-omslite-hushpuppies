import { gql } from '@apollo/client';

export const getNotificationList = gql`
    query getNotificationList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getNotificationList(
            pageSize: $pageSize,
            currentPage: $currentPage
        ){
            items {
                id
                created_at
                entity_type
                status
                message
                attachment
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

export const getNotificationById = gql`
    query getNotificationById(
        $id: Int!,
    ){
        getNotificationById(
            id: $id
        ){
            id
            created_at
            entity_type
            status
            message
            attachment
        }
    }
`;

export const multiReadNotification = gql`
    mutation multiReadNotification (
        $id: [Int!]!
    ){
        multireadNotification(
            id: $id
        )
    }
`;

export default {
    getNotificationList,
    getNotificationById,
    multiReadNotification,
};
