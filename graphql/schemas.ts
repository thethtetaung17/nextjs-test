import { gql } from '@apollo/client';

export const COUNTRIES = gql`
    query Countries {
        countries   {
            code
            name
            emoji
        }
    }
`;

const NotificationFragment = {
    notification: gql`
        fragment NotiRequestData on NotifyType {
            id
            sourceUserID
            targetUserIDs
            title
            content
            type
            infoType
            dataList {
                value
                type
                name
            }
            read
            createdAt
            updatedAt
        }
    `,
};

export const NOTI_SUBSCRIPTION = gql`
subscription {
    newNotification {
        id
        sourceUserID
        targetUserIDs
        title
        content
        type
        infoType
    }
  }
`;