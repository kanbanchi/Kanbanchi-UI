import * as React from 'react';
import {IAddNotificationComponentProps} from "./types";
import {Icon} from '../../ui';

export const AddNotificationComponent: React.SFC<IAddNotificationComponentProps> =
    props => {
        return (
            <span className='add-notification--icon'
                 onClick={props.onAddNotification}>
                <Icon xlink='bell-plus'/>
            </span>
        );
    };

AddNotificationComponent.defaultProps = {
    onAddNotification: () => console.log('onAddNotification')
};