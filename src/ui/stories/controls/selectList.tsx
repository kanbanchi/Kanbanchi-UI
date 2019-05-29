import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { SelectList } from './../../../ui';

const Story = () => {
    return (
        <div className="page">
            <section className="section-form-min">
                <h2>SelectList</h2>

                <SelectList fixActive={false}>
                    <li>
                        Copy card
                    </li>
                    <li className="divider">
                        Print card
                    </li>
                    <li className="divider someClass">
                        Get link to card
                    </li>
                    <li className="disabled">
                        Delete card
                    </li>
                </SelectList>
                
            </section>

            <section>
                <h2>Divider</h2>

                {`<li className="divider">`} adds {`<Divider/>`} after li
            </section>

            <section>
                <h2>Disabled</h2>

                {`<li className="disabled">`}
            </section>
        </div>
    );
};

storiesOf('Controls', module)
    .add('SelectList', () => <Story/>);
