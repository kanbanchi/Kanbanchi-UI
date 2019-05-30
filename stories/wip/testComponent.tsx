import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TestComponent } from '../../src/wip/testComponent/testComponent';

const Story = () => {
    return (
        <div className="page">
            <section>
                <h2>TestComponent</h2>
                <TestComponent></TestComponent>
                <br />
                <TestComponent isBlack doWork={()=>console.log('(.Y.)')}></TestComponent>
            </section>
        </div>
    );
};

storiesOf('WIP', module)
    .add('TestComponent', () => <Story/>);
