import * as React from 'react';
import {
    NotificationListItemComponent,
    notificationListItemMockProps
} from '../NotificationListItemComponent/NotificationListItemComponent';
import {INotificationsContainerProps} from './types';

export const NotificationsContainer: React.SFC<INotificationsContainerProps> = (props) => {
    const {notifications} = props;
    return (
        <div className="notifications-container">
            {
                // notifications.map(notification => {
                //     const {id} = notification;
                //     return (
                //         <NotificationListItemComponent id={id}/>
                //     )
                // })
            }
            <NotificationListItemComponent
                id={notificationListItemMockProps.id}
                key={notificationListItemMockProps.id}
                {...notificationListItemMockProps} />
            <NotificationListItemComponent
                id={notificationListItemMockProps.id}
                key={notificationListItemMockProps.id}
                {...notificationListItemMockProps}/>
        </div>
    )
};

NotificationsContainer.defaultProps = {
    notifications: []
};

NotificationsContainer.displayName = 'NotificationsContainer';
