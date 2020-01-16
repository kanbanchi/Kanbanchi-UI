import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Radio } from '../../src/ui';

const Story = () => {
    const [val, setVal] = React.useState();

    return (
        <div className="page">
            <section className="section-form-min">
                <h2>Radio</h2>
                <Radio
                    active={val}
                    onChange={(i: any)=>setVal(i.index)}
                >
                    <div>Lorem ipsum</div>
                    <div>Dolor sit amet</div>
                    <div className="cusomClass"><b>Consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    <div className="disabled">Disabled</div>
                </Radio>

                <br/><br/>

                Check empty Radio: <Radio onChange={()=>{}}></Radio>
            </section>
        </div>
    );
};

storiesOf('Controls', module)
    .add('Radio', () => <Story/>);
