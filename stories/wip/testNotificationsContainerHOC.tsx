import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { NotificationsContainer } from '../../src/wip/NotificationsContainerHOC/NotificationsContainerHOC';

const Story = () => {
    return (
        <NotificationsContainer/>
    );
};

storiesOf('WIP', module)
    .add('NotificationsContainerHOC', () => <Story/>);
