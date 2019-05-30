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
