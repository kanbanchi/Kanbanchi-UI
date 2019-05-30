import React from 'react';
import { storiesOf } from '@storybook/react';
import { LoaderBlock, Loader, ButtonsGroup, Button, Input, Radio, Checkbox, Search, Select, SelectList, SelectListItem, ButtonDropdown } from '../src/ui';
class StoryControls extends React.Component {
    constructor() {
        super();
        this.setStateProp = this.setStateProp.bind(this);
        
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

    render() {
        return (
            <div className="page">

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
