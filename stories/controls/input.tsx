import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from '../../src/ui';

const Story = () => {
    return (
        <div className="page">
            <section className="section-form-min">
                <h2>Input</h2>

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
