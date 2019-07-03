import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from '../../src/ui';

const Story = () => {
    const [val, setVal] = React.useState('');
    const [val1, setVal1] = React.useState('');
    const [tt, setTt] = React.useState(null);
    const [val2, setVal2] = React.useState('');
    const [val3, setVal3] = React.useState('');
    return (
        <div className="page">
            <section className="section-form-min">
                <h2>Search</h2>

                <Input
                    autosize={false}
                    variant="search"
                    value={val2}
                    onChange={(e: any) => setVal2(e.target.value)}
                />
            </section>

            <section className="section-grey section-form-min">
                <h2>Search Color="grey"</h2>

                <Input
                    autosize={false}
                    color="grey"
                    variant="search"
                    value={val3}
                    onChange={(e: any) => setVal3(e.target.value)}
                />

            </section>

            <section className="section-form-min">
                <h2>Input</h2>

                <Input
                    label="Error"
                    placeholder="Hover for tooltip"
                    state={tt ? 'error' : null}
                    tooltip={{
                        direction: 'right',
                        value: tt
                    }}
                    value={val1}
                    onChange={(e: any)=>{
                            setTt((e.target.value === '5') ? 'error' : null);
                            setVal1(e.target.value)
                        }
                    }
                />

                <br/>

                <Input
                    label="Error"
                    placeholder="Hover for tooltip"
                    state="error"
                    tooltip={{
                        direction: 'right',
                        value: 'Error Tooltip'
                    }}
                    value={val}
                    onChange={(e: any)=>setVal(e.target.value)}
                />

                <br/>

                <Input
                    label="Success"
                    placeholder="Hover for tooltip"
                    state="success"
                    tooltip={{
                        direction: 'down-right',
                        value: 'Success Tooltip'
                    }}
                />

                <br/>

                <Input label="Label" placeholder="Your text"
                    onBlur={(e: any)=>console.log('onBlur', e.target.value)}
                />

                <br/>

                <Input value="Without label & readonly" readOnly={true} />

                <br/>

                <Input
                    label="No resize"
                    autosize={false}
                    onChange={(e: any)=>console.log('onChange', e.target.value)}
                    onEnter={(e: any)=>console.log('onEnter', e.target.value)}
                />

                <br/>

                <Input label="Label" placeholder="Disabled" disabled />

            </section>

            <section className="section-grey section-form-min">
                <h2>Color="grey"</h2>

                <Input color="grey" label="Label" placeholder="Text input" />

                <br/>

                <Input color="grey" label="Label" placeholder="Disabled" disabled />

            </section>
        </div>
    );
};

storiesOf('Controls', module)
    .add('Input', () => <Story/>);
