import * as React from 'react';
import {
    NotificationListItemComponent,
    notificationListItemMockProps
} from '../NotificationListItemComponent/NotificationListItemComponent';
import {INotificationsContainerProps} from './types';

export const NotificationsContainer: React.SFC<INotificationsContainerProps> = (props) => {
    const {notifications} = props;
    return (
        // notifications.map(element => {
        //     const {id} = element;
        //     return (
        //         <NotificationListItemComponent id={id}/>
        //     )
        // })
        <div className="notifications-container">
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
