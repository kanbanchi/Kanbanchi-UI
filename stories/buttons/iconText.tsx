import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonsGroup, Icon } from '../../src/ui';
import { ThemeSwitch } from '../common/themeSwitch/themeSwitch';

const Story = () => {
    return (
        <div className="page">
            <ThemeSwitch />
             <section>
                <h2>IconText</h2>

                <ButtonsGroup size="large">

                    <Button
                        style={{width: '160px'}}
                        text="Button text"
                        variant="icon-text"
                    >
                        <Icon xlink="knowlege" size={24} />
                    </Button>

                    <Button
                        disabled
                        text="Button text"
                        title="Disabled"
                        variant="icon-text"
                    >
                        <Icon xlink="knowlege" size={24} />
                    </Button>

                </ButtonsGroup>

            </section>
        </div>
    );
};

storiesOf('Buttons', module)
    .add('IconText', () => <Story/>);
