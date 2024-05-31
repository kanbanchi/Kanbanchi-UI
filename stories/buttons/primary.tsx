import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonsGroup } from '../../src/ui';
import { ThemeSwitch } from '../common/themeSwitch/themeSwitch';

const Story = () => {
    return (
        <div className="page">
            <ThemeSwitch />
             <section>
                <h2>Primary</h2>

                <ButtonsGroup size="large">
                    <Button size="large">Large</Button>
                    <Button size="large" disabled>Disabled</Button>
                </ButtonsGroup>

                <br />

                <ButtonsGroup>
                    <Button>Small</Button>
                    <Button disabled>Disabled</Button>
                </ButtonsGroup>

            </section>

            <section className="section-purple">
                <h2>Color="white"</h2>
                <ButtonsGroup size="large">
                    <Button color="white" size="large">Large</Button>
                    <Button color="white" size="large" disabled>Large Disabled</Button>
                </ButtonsGroup>
                <br />
                <ButtonsGroup>
                    <Button color="white">Small</Button>
                    <Button color="white" disabled>Small Disabled</Button>
                </ButtonsGroup>
            </section>
        </div>
    );
};

storiesOf('Buttons', module)
    .add('Primary', () => <Story/>);
