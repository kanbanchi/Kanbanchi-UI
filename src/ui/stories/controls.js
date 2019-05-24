import React, {useEffect} from 'react';
import { storiesOf } from '@storybook/react';
import { LoaderBlock, Loader, ButtonsGroup, Button, Tabs, Input, Switch, Radio, Checkbox, Datepicker, Search, Select, SelectList, SelectListItem, ButtonDropdown } from '../../ui';
class StoryControls extends React.Component {
    constructor() {
        super();
        this.setStateProp = this.setStateProp.bind(this);
        this.loadList = this.loadList.bind(this);
        this.state = {
            dates: [null],
            listWithLoader: [],
            loading: false
        };
        this.types = [
            //'button',
            //'checkbox',
            //'color',
            //'date',
            'datetime-local',
            'email',
            //'file',
            //'hidden',
            //'image',
            'month',
            'number',
            'password',
            //'radio',
            //'range',
            //'reset',
            'search',
            //'submit',
            'tel',
            'text',
            'time',
            'url',
            //'week'
        ];
        this.inputTypes = this.types.map(type => 
            <Input 
                autosize={false}
                label={type} type={type} key={type}
                style={{width: 200}}
            />
        );

        this.selectTypes = this.types.map(type => 
            <Select 
                editable={true}
                label={type} type={type} key={type}
                style={{width: 200}}
            >
                <SelectList><li>¯\_(ツ)_/¯</li></SelectList>
            </Select>
        );

        this.loadTimeout = null;
    }

    setStateProp({prop, propIndex, val}) {
        this.setState((prevState) => {
            return {
                ...prevState,
                [prop]: {
                    ...prevState[prop],
                    [propIndex]: val
                }
            };
        });
    }

    loadList(success = true) {
        let val = [];
        this.setState({loading: true});
        clearTimeout(this.loadTimeout);
        this.loadTimeout = setTimeout(() => {
            if (success) {
                val.push(<SelectListItem 
                    key="0"
                    icon="card"
                    list="List Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                >
                    Card Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </SelectListItem>);
                val.push(<SelectListItem
                    key="1"
                    icon="archive"
                    list="List"
                >
                    Card name
                </SelectListItem>);
                val.push(<SelectListItem
                    key="2"
                    icon="card"
                    list="List Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                >
                    Card Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </SelectListItem>);
                val.push(<SelectListItem
                    key="3"
                    icon="archive"
                    list="List"
                >
                    Card name
                </SelectListItem>);
            } else {
                val.push(<SelectListItem >
                    ¯\_(ツ)_/¯
                </SelectListItem>);
            }
            this.setState({
                listWithLoader: val,
                loading: false
            });
        }, 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.loadTimeout);
    }

    render() { 
        return (
            <div className="page">
                
                <section>
                    <h2>Loader</h2>
                    <Loader/>
                </section>

                <section>
                    <h2>Datepicker</h2>
                    <Datepicker
                        selected={this.state.dates[0]}
                        onSelect={(val)=>this.setStateProp({prop: 'dates', propIndex: 0, val})}
                        minDate={new Date('2019-05-22')}
                        highlightDates={[
                            { "react-datepicker__day--highlighted": [
                            new Date('2019-05-24'),
                            new Date('2019-05-25')
                            ]}
                        ]}
                    /><Loader small className="stories-loader-small"/>
                </section>

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
                    <Input label="Label" value="Text test"
                        onBlur={e=>console.log('onBlur', e.target.value)}
                    />
                    <br/>
                    <Input placeholder="Without label & readonly" readOnly={true} />
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

                <section>
                    <h2>Input types</h2>
                    <ButtonsGroup size="large">
                        {this.inputTypes}
                    </ButtonsGroup>
                </section>

                <section>
                    <h2>Select types</h2>
                    <ButtonsGroup size="large">
                        {this.selectTypes}
                    </ButtonsGroup>
                </section>

                <section className="section-form-min">
                    <div className="section-relative">
                        <h2>Search</h2>
                        <Search 
                            editable={true}
                            onOpen={()=>this.loadList()}
                        >
                            <SelectList fixActive={false} loading={this.state.loading}>
                                {this.state.listWithLoader}
                                <LoaderBlock/>
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
                        <ButtonsGroup size="large">
                            <Select 
                                editable={true}
                                label="Number"
                                style={{width: 100}}
                                type="number"
                                variants={['arrow']}
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
                            <Select 
                                active={40}
                                editable={true}
                                label="Time"
                                icon="deadline"
                                variants={['withicon']}
                                style={{width: 120}}
                                onChange={i=>{console.log('Time', i.item)}}
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
                                    <li divider>11:30 AM</li>
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
                    
                    <br />
                    <Select 
                        active={0}
                        label="Header"
                        variants={['header', 'arrow']}
                        onChange={i=>{console.log('Plan', i.item)}}
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
                    <br />
                    <Select 
                        active={0}
                        direction="up"
                        label="Direction up force"
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
                        <ButtonsGroup size="large" className="section-form-min" style={{justifyContent: 'space-between'}}>
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
