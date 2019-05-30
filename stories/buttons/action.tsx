import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonsGroup } from '../../src/ui';

const Story = () => {    
    return (
        <div className="page">
             <section>
                <h2>Actions</h2>
                <ButtonsGroup>
                    <Button variant="action">Action</Button>
                    <Button variant="action" disabled>Disabled</Button>
                </ButtonsGroup>
            </section>
        </div>
    );
};

storiesOf('Buttons', module)
    .add('Action', () => <Story/>);
