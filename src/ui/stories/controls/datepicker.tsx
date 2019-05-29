import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Datepicker } from './../../../ui';

const Story = () => {
    const [date, setDate] = React.useState();
    const [date01, setDate01] = React.useState(new Date());

    return (
        <div className="page">
            <section>
                <h2>Datepicker</h2>

                <Datepicker
                    selected={date}
                    onChange={val=>setDate(val)}
                />

                <br/><br/>

                <Datepicker
                    isClearable={false}
                    label="From"
                    minDate={new Date('2019-05-22')}
                    popperPlacement="bottom-start"
                    selected={date01}
                    onChange={val=>setDate01(val)}
                />

            </section>
        </div>
    );
};

storiesOf('Controls', module)
    .add('Datepicker', () => <Story/>);

/*
highlightDates={[
    { "react-datepicker__day--highlighted": [
    new Date('2019-05-24'),
    new Date('2019-05-25')
    ]}
]}
*/