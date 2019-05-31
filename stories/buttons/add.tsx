import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../../src/ui';

const Story = () => {
    return (
        <div className="page">
             <section className="section-form-min">
                <h2>Add</h2>

                <Button variant="add">Add button</Button>

                <br /><br />

                <Button variant="add" disabled>Disabled</Button>

            </section>
        </div>
    );
};

storiesOf('Buttons', module)
    .add('Add', () => <Story/>);
