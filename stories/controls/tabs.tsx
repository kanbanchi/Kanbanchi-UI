import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Tabs } from '../../src/ui';

const Story = () => {
    const [val, setVal] = React.useState(0);
    const [val01, setVal01] = React.useState(1);

    return (
        <div className="page">
            <section>
                <h2>Tabs</h2>

                <Tabs
                    active={val}
                    onChange={(i: any)=>setVal(i)}
                >
                    <Button>Tab 0</Button>
                    <Button>Tab 1</Button>
                    <Button>Tab 2</Button>
                </Tabs>

                <div hidden={val!==0} tabIndex={0}>
                    Tab 0
                </div>
                <div hidden={val!==1} tabIndex={0}>
                    Tab 1
                </div>
                <div hidden={val!==2} tabIndex={0}>
                    Tab 2
                </div>
            </section>

            <section>
                <h4>Size="large"</h4>
                <Tabs
                    active={val01}
                    size="large"
                    onChange={(i: any)=>setVal01(i)}
                >
                    <Button>Tab 0</Button>
                    <Button>Tab 1</Button>
                    <Button>Tab 2</Button>
                    <Button>Tab 3</Button>
                    <Button>Tab 4</Button>
                </Tabs>

                <br/>

                Check empty Tabs:
                <Tabs
                    active={0}
                    onChange={()=>{}}
                ></Tabs>

            </section>
        </div>
    );
};

storiesOf('Controls', module)
    .add('Tabs', () => <Story/>);
