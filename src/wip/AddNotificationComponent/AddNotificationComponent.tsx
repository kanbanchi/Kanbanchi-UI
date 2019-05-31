import * as React from 'react';
import {IAddNotificationComponentProps} from './types';
import {Button, Icon} from '../../ui';
import './_AddNotificationComponent.scss'

export const AddNotificationComponent: React.SFC<IAddNotificationComponentProps> =
    (props) => {
        return (
            <Button
                variant="icon"
                className="add-notification--icon"
                onClick={props.onAddNotification}
            >
                <Icon xlink="bell-plus"/>
            </Button>
        );
    };

AddNotificationComponent.defaultProps = {
    onAddNotification: () => console.log('onAddNotification')
};
