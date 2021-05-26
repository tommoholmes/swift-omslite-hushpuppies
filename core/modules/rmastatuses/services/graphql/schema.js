import { gql } from '@apollo/client';

export const getRmaStatusList = gql`
    query getRmaStatusList(
        $pageSize: Int!,
        $currentPage: Int!,
        $sort: RmaStatusSortInput,
    ){
        getRmaStatusList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            sort: $sort,
        ){
            items {
                status_code
                status_label
                position
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

export const getRmaStatusByCode = gql`
    query getRmaStatusByCode(
        $status_code: String!,
    ){
        getRmaStatusByCode(
            status_code: $status_code
        ){
            status_code
            status_label
            position
            in_item
            message_text
            is_email_customer
            email_customer_text
            is_email_admin
            email_admin_text
        }
    }
`;

export const updateRmaStatus = gql`
    mutation updateRmaStatus(
        $status_code: String!,
        $status_label: String,
        $position: Int,
        $in_item: Int,
        $message_text: String,
        $is_email_customer: Int,
        $email_customer_text: String,
        $is_email_admin: Int,
        $email_admin_text: String,
    ){
        updateRmaStatus(
            status_code: $status_code,
            input: {
                status_label: $status_label,
                position: $position,
                in_item: $in_item,
                message_text: $message_text,
                is_email_customer: $is_email_customer,
                email_customer_text: $email_customer_text,
                is_email_admin: $is_email_admin,
                email_admin_text: $email_admin_text,
            }
        ){
            status_code
            status_label
            position
            in_item
            message_text
            is_email_customer
            email_customer_text
            is_email_admin
            email_admin_text
        }
    }
`;

export default {
    getRmaStatusList,
    getRmaStatusByCode,
    updateRmaStatus,
};
