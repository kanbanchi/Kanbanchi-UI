import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeSwitch } from '../common/themeSwitch/themeSwitch';

const Story = () => {
    return (
        <div className="page">
            <ThemeSwitch />
            <section>
                <h2>TestComponent</h2>
            </section>
        </div>
    );
};

storiesOf('WIP', module)
    .add('TestComponent', () => <Story/>);
