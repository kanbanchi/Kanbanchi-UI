import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ButtonsGroup, Select, SelectList, SelectListItem } from '../../src/ui';

const Story = () => {

    const [val, setVal] = React.useState(0);
    const [val01, setVal01] = React.useState(null);
    const [val02, setVal02] = React.useState(40);
    const [val03, setVal03] = React.useState(0);
    const [val04, setVal04] = React.useState(null);

    return (
        <div className="page">
            <section>
                <h2>Select</h2>

                <Select
                    active={val04}
                    className="w100px"
                    label="Options"
                    options={{
                        0: 'Option 0',
                        1: 'Option 1',
                        '2': 'Option 2'
                    }}
                    variant="arrow"
                    onChange={(i: any)=>setVal04(i.item.index)}
                >
                </Select>

                <br/><br/>

                <Select
                    active={val}
                    label="Header"
                    variant="header"
                    onChange={(i: any)=>setVal(i.item.index)}
                >
                    <SelectList>
                        <li className="starter" value="sy" >
                            Starter yearly
                        </li>
                        <li value="pm">
                            Professional monthly
                        </li>
                    </SelectList>
                </Select>

            </section>

            <section>
                    <h2>Editable</h2>
                    <div className="section-relative">
                        <ButtonsGroup size="large">
                            <Select
                                active={val01}
                                editable={true}
                                label="Number"
                                style={{width: 100}}
                                type="number"
                                variant="arrow"
                                onChange={(i: any)=>setVal01(i.item.index)}
                            >
                                <SelectList>
                                    <li className="divider">0</li>
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>4</li>
                                    <li>5</li>
                                    <li>6</li>
                                    <li>7</li>
                                    <li>8</li>
                                    <li>9</li>
                                    <li className="divider">10</li>
                                    <li className="disabled">Disabled</li>
                                </SelectList>
                            </Select>
                            <Select
                                active={val02}
                                editable={true}
                                label="Time"
                                icon="deadline"
                                variant="withicon"
                                style={{width: 120}}
                                onChange={(i: any)=>setVal02(i.item.index)}
                            >
                                <SelectList>
                                    <li>12:00 AM</li>
                                    <li>12:30 AM</li>
                                    <li>01:00 AM</li>
                                    <li>01:30 AM</li>
                                    <li>02:00 AM</li>
                                    <li>02:30 AM</li>
                                    <li>03:00 AM</li>
                                    <li>03:30 AM</li>
                                    <li>04:00 AM</li>
                                    <li>04:30 AM</li>
                                    <li>05:00 AM</li>
                                    <li>05:30 AM</li>
                                    <li>06:00 AM</li>
                                    <li>06:30 AM</li>
                                    <li>07:00 AM</li>
                                    <li>07:30 AM</li>
                                    <li>08:00 AM</li>
                                    <li>08:30 AM</li>
                                    <li>09:00 AM</li>
                                    <li>09:30 AM</li>
                                    <li>10:00 AM</li>
                                    <li>10:30 AM</li>
                                    <li>11:00 AM</li>
                                    <li className="divider">11:30 AM</li>
                                    <li>12:00 PM</li>
                                    <li>12:30 PM</li>
                                    <li>01:00 PM</li>
                                    <li>01:30 PM</li>
                                    <li>02:00 PM</li>
                                    <li>02:30 PM</li>
                                    <li>03:00 PM</li>
                                    <li>03:30 PM</li>
                                    <li>04:00 PM</li>
                                    <li>04:30 PM</li>
                                    <li>05:00 PM</li>
                                    <li>05:30 PM</li>
                                    <li>06:00 PM</li>
                                    <li>06:30 PM</li>
                                    <li>07:00 PM</li>
                                    <li>07:30 PM</li>
                                    <li>08:00 PM</li>
                                    <li>08:30 PM</li>
                                    <li>09:00 PM</li>
                                    <li>09:30 PM</li>
                                    <li>10:00 PM</li>
                                    <li>10:30 PM</li>
                                    <li>11:00 PM</li>
                                    <li>11:30 PM</li>
                                </SelectList>
                            </Select>
                        </ButtonsGroup>
                    </div>

            </section>

            <section>
                    <h2>Direction</h2>

                    <p>directionVertical="up"</p>

                    <Select
                        active={val03}
                        directionVertical="up"
                        variant="priority"
                        onChange={(i: any)=>setVal03(i.item.index)}
                    >
                        <SelectList>
                            <SelectListItem value="0" icon="priority-no">
                                No priority
                            </SelectListItem>
                            <SelectListItem value="1" icon="priority-low">
                                Low
                            </SelectListItem>
                            <SelectListItem value="2" icon="priority-normal">
                                Normal
                            </SelectListItem>
                            <SelectListItem value="3" icon="priority-medium">
                                Medium
                            </SelectListItem>
                            <SelectListItem value="4" icon="priority-high">
                                High
                            </SelectListItem>
                            <SelectListItem value="5" icon="priority-critical">
                                Critical
                            </SelectListItem>
                        </SelectList>
                    </Select>
                </section>

        </div>
    );
};

storiesOf('Controls', module)
    .add('Select', () => <Story/>);
