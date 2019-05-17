import React from 'react';
import { storiesOf } from '@storybook/react';
import { ButtonsGroup, Button, Tabs, Input, Switch, Radio, Checkbox, Datepicker, Search, Select, SelectList, SelectListItem, ButtonDropdown } from '../../ui';
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
                    <Input variants={['grey']} label="Label" placeholder="Text input" />
                    <br/>
                    <Input variants={['grey']} label="Label" placeholder="Disabled" disabled />
                </section>

                <section className="section-form-min">
                    <div className="section-relative">
                        <h2>Search</h2>
                        <Search editable={true}>
                            <SelectList fixActive={false}>
                                <SelectListItem
                                    icon="card"
                                    list="List Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                >
                                    Card Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </SelectListItem>
                                <SelectListItem
                                    icon="archive"
                                    list="List"
                                >
                                    Card name
                                </SelectListItem>
                            </SelectList>
                        </Search>
                    </div>
                </section>

                <section className="section-grey">
                    <div className="section-relative">
                        <h2>Search</h2>
                        <Search
                            editable={true}
                            variants={['grey']}
                        >
                            <SelectList fixActive={false}>
                                <SelectListItem
                                    icon="card"
                                    list="List Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                >
                                    Card Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </SelectListItem>
                                <SelectListItem
                                    icon="archive"
                                    list="List"
                                >
                                    Card name
                                </SelectListItem>
                            </SelectList>
                        </Search>
                    </div>
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

                <section className="section-form-min">
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
                    <div className="section-relative">
                        <Select 
                            editable={true}
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
                    </div>
                    
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
                    <br />
                    <Select 
                        active={0}
                        variants={['priority']}
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

                <section>
                    <div className="section-relative">
                    <h2>Actions</h2>
                        <ButtonsGroup margin="large" className="section-form-min" style={{justifyContent: 'space-between'}}>
                            <ButtonDropdown>
                                <Button variant="add">
                                    Add smth
                                </Button>
                                <SelectList fixActive={false}>
                                    <SelectListItem
                                        icon="card"
                                        list="List Ut enim ad minim veniam!"
                                    >
                                        Card Lorem ipsum dolor sit amet?
                                    </SelectListItem>
                                    <SelectListItem
                                        icon="archive"
                                        list="List"
                                    >
                                        Card name
                                    </SelectListItem>
                                </SelectList>
                            </ButtonDropdown>
                            <ButtonDropdown variants={['right']}>
                                <Button variant="action">
                                    Actions Right
                                </Button>
                                <SelectList fixActive={false}>
                                    <li onClick={e=>console.log(e.target.innerText)}>
                                        Copy card
                                    </li>
                                    <li divider onClick={e=>console.log(e.target.innerText)}>
                                        Print card
                                    </li>
                                    <li divider onClick={e=>console.log(e.target.innerText)}>
                                        Get link to card
                                    </li>
                                    <li disabled onClick={e=>console.log(e.target.innerText)}>
                                        Delete card
                                    </li>
                                </SelectList>
                            </ButtonDropdown>
                        </ButtonsGroup>
                    </div>
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
