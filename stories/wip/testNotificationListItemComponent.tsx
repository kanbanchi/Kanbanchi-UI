import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { NotificationListItemComponent } from '../../src/wip/NotificationListItemComponent/NotificationListItemComponent';

const Story = () => {
    return (
        <NotificationListItemComponent/>
    );
};

storiesOf('WIP', module)
    .add('NotificationListItemComponent', () => <Story/>);
