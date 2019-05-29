import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Tabs } from './../../../ui';

const Story = () => {
    const [val, setVal] = React.useState(0);
    const [val01, setVal01] = React.useState(1);

    return (
        <div className="page">
            <section>
                <h2>Tabs</h2>

                <Tabs
                    active={val}
                    onChange={i=>setVal(i)}
                >
                    <Button>Tab 0</Button>
                    <Button>Tab 1</Button>
                    <Button>Tab 2</Button>
                </Tabs>
            </section>
            
            <section>
                <h4>size="large"</h4>
                <Tabs
                    active={val01}
                    onChange={i=>setVal01(i)}
                    size="large"
                >
                    <Button>Tab 0</Button>
                    <Button>Tab 1</Button>
                    <Button>Tab 2</Button>
                    <Button>Tab 3</Button>
                    <Button>Tab 4</Button>
                </Tabs>

            </section>
        </div>
    );
};

storiesOf('Controls', module)
    .add('Tabs', () => <Story/>);
