import * as React from 'react';
import { storiesOf } from '@storybook/react';

const Story = () => {
    return (
        <div className="page">
            <section>
                <h2>TestComponent</h2>
            </section>
        </div>
    );
};

storiesOf('WIP', module)
    .add('TestComponent', () => <Story/>);
