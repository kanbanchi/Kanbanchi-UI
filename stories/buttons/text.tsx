import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonsGroup } from '../../src/ui';
import { ThemeSwitch } from '../common/themeSwitch/themeSwitch';

const Story = () => {
    return (
        <div className="page">
            <ThemeSwitch />
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
