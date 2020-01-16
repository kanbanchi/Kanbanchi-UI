import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonsSegmented } from '../../src/ui';

const Story = () => {
    const [val, setVal] = React.useState(false);
    const [val01, setVal01] = React.useState(true);

    return (
        <div className="page">
            <section>
                <h2>ButtonsSegmented</h2>
                <ButtonsSegmented
                    active={+val}
                    onChange={(i: any)=>setVal(i)}
                >
                    <Button>Button 0</Button>
                    <Button>Button 1</Button>
                    <Button onClick={() => alert(2)}>Button 2</Button>
                </ButtonsSegmented>

            </section>

            <section>
                <h4>Color="black"</h4>

                <ButtonsSegmented
                    active={+val01}
                    color="black"
                    onChange={(i: any)=>setVal01(i)}
                >
                    <Button>Button 0</Button>
                    <Button>Button 1</Button>
                </ButtonsSegmented>
            </section>

            Check empty ButtonsSegmented:
            <ButtonsSegmented
                active={0}
                onChange={()=>{}}
            ></ButtonsSegmented>
        </div>
    );
};

storiesOf('Buttons', module)
    .add('ButtonsSegmented', () => <Story/>);
