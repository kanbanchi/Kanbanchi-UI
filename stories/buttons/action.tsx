import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonsGroup } from '../../src/ui';
import { ThemeSwitch } from '../common/themeSwitch/themeSwitch';

const Story = () => {
    return (
        <div className="page">
            <ThemeSwitch />
             <section>
                <h2>Actions</h2>
                <ButtonsGroup>
                    <Button variant="action">Action</Button>
                    <Button variant="action" disabled>Disabled</Button>
                </ButtonsGroup>
            </section>

            <section className="section-grey">
                <h2>Actions</h2>
                <ButtonsGroup>
                    <Button variant="action">Action</Button>
                    <Button variant="action" disabled>Disabled</Button>
                </ButtonsGroup>
            </section>

            <section className="section-purple">
                <h2>Color="white"</h2>
                <ButtonsGroup size="large">
                    <Button variant="action" color="white">Action</Button>
                    <Button variant="action" color="white" disabled>Disabled</Button>
                </ButtonsGroup>
            </section>
        </div>
    );
};

storiesOf('Buttons', module)
    .add('Action', () => <Story/>);
