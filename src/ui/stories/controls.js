import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Tabs, Input, Search, Switch, Radio, Checkbox, Datepicker, Select, SelectList, ButtonDropdown } from '../../ui';
class StoryControls extends React.Component {
    constructor() {
        super();
    }
    render() { 
        return (
            <div className="page">
                <section>
                    <h2>Tabs</h2>
                    <div>
                        <p><b>Default</b></p>
                        <Tabs
                            active={0}
                        >
                            <Button>Tab 0</Button>
                            <Button>Tab 1</Button>
                            <Button>Tab 2</Button>
                        </Tabs>
                    </div>
                    <br/>
                    <div>
                        <p><b>Large</b></p>
                        <Tabs
                            active={0}
                            onChange={i=>{console.log('Tab ' + i + ' active')}}
                            size="large"
                        >
                            <Button>Tab 0</Button>
                            <Button>Tab 1</Button>
                            <Button>Tab 2</Button>
                            <Button>Tab 3</Button>
                            <Button>Tab 4</Button>
                        </Tabs>
                    </div>
                </section>

                <section className="section-form-min">
                    <h2>Input</h2>
                    <Input label="Label" value="Text test"/>
                    <br/>
                    <Input placeholder="Without label" />
                    <br/>
                    <Input 
                        label="No resize"
                        autosize={false}
                        onChange={e=>console.log('onChange', e.target.value)}
                        onEnter={e=>console.log('onEnter', e.target.value)}
                    />
                    <br/>
                    <Input label="Label" placeholder="Disabled" disabled />
                </section>

                <section className="section-grey section-form-min">
                    <h2>Input</h2>
                    <Input label="Label" placeholder="Text input" />
                    <br/>
                    <Input label="Label" placeholder="Disabled" disabled />
                </section>

                <section>
                    <h2>Search</h2>
                    <Search>
                        Label
                    </Search>
                </section>

                <section className="section-form-min">
                    <h2>Switch</h2>
                    <Switch>Label</Switch>
                    <br/>
                    <Switch checked={true} onChange={()=>{console.log('Switch')}}>
                        Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Switch>
                    <br/>
                    <Switch disabled>Disabled</Switch>
                </section>

                <section className="section-form-min">
                    <h2>Radio</h2>
                    <Radio onChange={i=>{console.log('Radio ' + i + ' active')}}>
                        <div>Lorem ipsum</div>
                        <div>Dolor sit amet</div>
                        <div className="cusomClass"><b>Consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                        <div disabled>Disabled</div>
                    </Radio>
                </section>

                <section className="section-form-min">
                    <h2>Checkbox</h2>
                    <Checkbox>Label</Checkbox>
                    <br/>
                    <Checkbox checked={true} onChange={()=>{console.log('Checkbox')}}>
                        Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Checkbox>
                    <br/>
                    <Checkbox disabled>Disabled</Checkbox>
                </section>

                <section>
                    <h2>Datepicker</h2>
                    <Datepicker>
                        Label
                    </Datepicker>
                </section>

                <section>
                    <h2>SelectList</h2>
                    <SelectList fixActive={false}>
                        <li>
                            Copy card
                        </li>
                        <li divider>
                            Print card
                        </li>
                        <li divider>
                            Get link to card
                        </li>
                        <li disabled>
                            Delete card
                        </li>
                    </SelectList>
                </section>

                <section>
                    <h2>Select</h2>
                    <Select 
                        label="Select"
                        variants={['arrow']}
                        className="max-width-g10"
                    >
                        <SelectList>
                            <li divider>0</li>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>6</li>
                            <li>7</li>
                            <li>8</li>
                            <li>9</li>
                            <li divider>10</li>
                            <li disabled>Disabled</li>
                        </SelectList>
                    </Select>
                    <br />
                    <Select 
                        active={0}
                        label="Header"
                        variants={['header', 'arrow']}
                    >
                        <SelectList>
                            <li className="starter">
                                Starter yearly
                            </li>
                            <li>
                                Professional monthly
                            </li>
                        </SelectList>
                    </Select>
                </section>

                <section>
                    <h2>Actions</h2>
                    <ButtonDropdown>
                        <SelectList fixActive={false}>
                            <li>
                                Copy card
                            </li>
                            <li divider>
                                Print card
                            </li>
                            <li divider>
                                Get link to card
                            </li>
                            <li disabled>
                                Delete card
                            </li>
                        </SelectList>
                    </ButtonDropdown>
                </section>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

            </div>
        )
    } 
};

storiesOf('KUI', module)
    .add('controls', () => <StoryControls/>);
