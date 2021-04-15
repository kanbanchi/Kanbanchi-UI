import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Datepicker } from '../../src/ui';

const Story = () => {
    const [date, setDate] = React.useState(null);
    const [date01, setDate01] = React.useState(new Date());

    return (
        <div className="page">
            <section>
                <h2>Datepicker</h2>

                <Datepicker
                    placeholderText={'placeholder'}
                    selected={date}
                    onChange={val=>setDate(val)}
                />

                <br/><br/>

                <Datepicker
                    dateFormat={'dd.MM.yyyy'}
                    editable={false}
                    isClearable={false}
                    label="Not editable input"
                    minDate={new Date('2001-01-01')}
                    maxDate={new Date('2049-12-31')}
                    popperModifiers={{
                        preventOverflow: {
                            enabled: true,
                            escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                            boundariesElement: 'scrollParent'
                        }
                    }}
                    popperPlacement="bottom-start"
                    readOnly={false}
                    selected={date01}
                    showMonthDropdown
                    showYearDropdown
                    onChange={val=>setDate01(val)}
                />

                <br/><br/>

                <Datepicker
                    readOnly={true}
                    editable={true}
                    selected={null}
                    label="Readonly"
                    onChange={()=>{}}
                />

                <br/><br/>

                <Datepicker
                    readOnly={true}
                    editable={true}
                    selected={date01}
                    label="Readonly"
                    onChange={()=>{}}
                />

                <br/><br/>

                <Datepicker
                    disabled={true}
                    editable={true}
                    selected={null}
                    label="Disabled"
                    onChange={()=>{}}
                />

                <br/><br/>

                <Datepicker
                    disabled={true}
                    editable={true}
                    selected={date01}
                    label="Disabled"
                    onChange={()=>{}}
                />

                <br/><br/>

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
