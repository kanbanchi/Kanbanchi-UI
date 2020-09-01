import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonTitle, Icon } from '../../src/ui';

const Story = () => {
    return (
        <div className="page">
            <section>
                <h2>ButtonTitle</h2>

                <Button variant="secondary">
                    <ButtonTitle>Title</ButtonTitle>
                    <Icon xlink="overdue" style={{marginLeft: '4px'}}/>
                </Button>

            </section>
        </div>
    );
};

storiesOf('Buttons', module)
    .add('ButtonTitle', () => <Story/>);
