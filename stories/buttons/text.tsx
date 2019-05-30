import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonsGroup } from '../../src/ui';

const Story = () => {
    return (
        <div className="page">
             <section>
                <h2>Text</h2>

                <ButtonsGroup size="large">
                    <Button variant="text" href="#">Link</Button>
                    <Button variant="text" href="#" disabled>Disabled link</Button>
                </ButtonsGroup>

            </section>
        </div>
    );
};

storiesOf('Buttons', module)
    .add('Text', () => <Story/>);
