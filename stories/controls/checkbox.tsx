import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '../../src/ui';

const Story = () => {
    const [val, setVal] = React.useState(false);
    const [val01, setVal01] = React.useState(true);
    const [val02, setVal02] = React.useState(false);
    const [val03, setVal03] = React.useState(true);
    const [val04, setVal04] = React.useState(true);

    return (
        <div className="page">
            <section className="section-form-min">
                <h2>Checkbox</h2>

                <Checkbox
                    checked={val}
                    onChange={()=>setVal(!val)}
                >
                    Label
                </Checkbox>

                <br/>

                <Checkbox
                    checked={val01}
                    onChange={()=>setVal01(!val01)}
                >
                    Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Checkbox>

                <br/>

                <Checkbox
                    checked={val02}
                    onChange={()=>setVal02(!val02)}
                    disabled
                >
                    Disabled
                </Checkbox>

            </section>

            <section className="section-form-min">
                <h4>Color="black"</h4>
                <Checkbox
                    checked={val03}
                    color="black"
                    onChange={()=>setVal01(!val03)}
                >
                    Black checkbox
                </Checkbox>

                <br/>

                <Checkbox
                    checked={val04}
                    color="black"
                    onChange={()=>setVal04(!val02)}
                    disabled
                >
                    Disabled
                </Checkbox>

            </section>
        </div>
    );
};

storiesOf('Controls', module)
    .add('Checkbox', () => <Story/>);
