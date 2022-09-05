import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Datepicker } from '../../src/ui';

const Story = () => {
    const [date, setDate] = React.useState<Date | null>(null);
    const [date01, setDate01] = React.useState<Date | null>(new Date());
    const [date02, setDate02] = React.useState<Date | null>(new Date());

    return (
        <div className="page">
            <section>
                <h2>Datepicker</h2>

                <Datepicker
                    datepicker={{
                        placeholderText: 'placeholder',
                        selected: date,
                        onChange: val=>setDate(val)
                    }}
                /> {date ? date.toString() : 'null'}

                <br/><br/>

                <Datepicker
                    datepicker={{
                        dateFormat: 'dd.MM.yyyy',    
                        minDate: new Date('2001-01-01'),
                        maxDate: new Date('2049-12-31'),
                        popperModifiers: [
                            {
                                name: 'preventOverflow',
                                enabled: true,
                                options: {
                                    mainAxis: false,
                                    altAxis: true,
                                    altBoundary: true,
                                }
                            }
                        ],
                        popperPlacement: "bottom-start",
                        selected: date01,
                        showMonthDropdown: true,
                        showYearDropdown: true,
                        onChange: val=>setDate01(val)
                    }}
                    editable={false}
                    isClearable={false}
                    label="Not editable input"
                    readOnly={false}
                    /> {date01 ? date01.toString() : 'null'}

<br/><br/>

<Datepicker
    datepicker={{
        selected: date02,
        onChange: val=>setDate02(val)
    }}
    label="Error"
    state={'error'}
/>

                <br/><br/>

                <Datepicker
                    readOnly={true}
                    editable={true}
                    label="Readonly"
                    onChange={()=>{}}
                />

                <br/><br/>

                <Datepicker
                    readOnly={true}
                    editable={true}
                    datepicker={{
                        selected: date02,
                        onChange: ()=>{}
                    }}
                    label="Readonly"
                    onChange={()=>{}}
                />

                <br/><br/>

                <Datepicker
                    disabled={true}
                    editable={true}
                    label="Disabled"
                    onChange={()=>{}}
                />

                <br/><br/>

                <Datepicker
                    disabled={true}
                    editable={true}
                    datepicker={{
                        selected: date02,
                        onChange: ()=>{}
                    }}
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
