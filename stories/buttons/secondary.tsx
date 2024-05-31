import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonsGroup } from '../../src/ui';
import { ThemeSwitch } from '../common/themeSwitch/themeSwitch';

const Story = () => {
    return (
        <div className="page">
            <ThemeSwitch />
             <section>
                <h2>Secondary</h2>

                <ButtonsGroup size="large">
                    <Button variant="secondary" size="large">Large</Button>
                    <Button variant="secondary" size="large" disabled>Large Disabled</Button>
                </ButtonsGroup>

                <br />

                <ButtonsGroup>
                    <Button variant="secondary">Small</Button>
                    <Button variant="secondary" disabled>Small Disabled</Button>
                </ButtonsGroup>

            </section>
        </div>
    );
};

storiesOf('Buttons', module)
    .add('Secondary', () => <Story/>);
