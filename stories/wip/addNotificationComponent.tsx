import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AddNotificationComponent } from '../../src/wip/AddNotificationComponent/AddNotificationComponent';

const Story = () => {
    return (
        <AddNotificationComponent/>
    );
}

storiesOf('WIP', module)
    .add('AddNotificationComponent', () => <Story/>);