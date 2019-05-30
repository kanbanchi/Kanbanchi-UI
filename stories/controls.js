import React from 'react';
import { storiesOf } from '@storybook/react';
import { LoaderBlock, Loader, ButtonsGroup, Button, Input, Radio, Checkbox, Search, Select, SelectList, SelectListItem, ButtonDropdown } from '../src/ui';
class StoryControls extends React.Component {
    constructor() {
        super();
        this.setStateProp = this.setStateProp.bind(this);
        this.loadList = this.loadList.bind(this);
        this.state = {
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
                    <Loader size="large"/>

                    <br /><br />

                    <Loader className="stories-loader-small"/>
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
                    <Input color="grey" label="Label" placeholder="Text input" />
                    <br/>
                    <Input color="grey" label="Label" placeholder="Disabled" disabled />
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
                            color="grey"
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
