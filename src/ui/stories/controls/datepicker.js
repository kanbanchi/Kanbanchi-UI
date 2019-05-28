import React, {useState} from 'react';
import { storiesOf } from '@storybook/react';
import { Datepicker } from './../../../ui';

const Story = () => {
    const [date, setDate] = useState(Date.now());

    return (
        <div className="page">
            <section>
                <h2>Datepicker</h2>

                <Datepicker
                    label="From"
                    minDate={new Date('2019-05-22')}
                    popperPlacement="bottom-start"
                    selected={date}
                    onChange={(val)=>setDate(val)}
                    highlightDates={[
                        { "react-datepicker__day--highlighted": [
                        new Date('2019-05-24'),
                        new Date('2019-05-25')
                        ]}
                    ]}
                />

            </section>
        </div>
    );
};

storiesOf('controls', module)
    .add('datepicker', () => <Story/>);
