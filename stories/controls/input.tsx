import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input, Button, ButtonsGroup } from '../../src/ui';

const Story = () => {
    const [val, setVal] = React.useState('');
    const [val1, setVal1] = React.useState('');
    const [tt, setTt] = React.useState(null);
    const [val2, setVal2] = React.useState('');
    const [val3, setVal3] = React.useState('');

    const inputRef = React.useRef(null);

    return (
        <div className="page">
            <section className="section-form-min">
                <h2>Search</h2>

                <Input
                    autosize={false}
                    ref={inputRef}
                    searchPlaceholder={'Custom placeholder'}
                    variant="search"
                    value={val2}
                    onChange={(e: any) => {
                        setVal2(e.target.value);
                        console.log(inputRef.current.getInput());
                    }}
                    onFocus={(e: any) => {
                        if (e) console.log(e.target.value)
                    }}
                    onEnter={(e: any) => {
                        if (e) console.log('onEnter', e.target.value)
                    }}
                />

                <br/>

                <ButtonsGroup>
                    <Button
                        onClick={() => {
                            setVal2('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ');
                            inputRef.current.setFocus();
                        }}
                    >
                        Set value 'Lorem...'
                    </Button>
                    <Button
                        onClick={() => {
                            setVal2('');
                        }}
                    >
                        clear
                    </Button>
                </ButtonsGroup>

                <br/>

                <Input
                    autosize={false}
                    disabled={true}
                    variant="search"
                    value={'Disabled'}
                />

            </section>

            <section className="section-grey section-form-min">
                <h2>Search Color="grey"</h2>

                <Input
                    autosize={false}
                    color="grey"
                    variant="search"
                    value={val3}
                    onChange={(e: any) => setVal3(e.target.value)}
                />

            </section>

            <section className="section-form-min">
                <h2>Input</h2>

                <Input
                    isClearable={true}
                    label={'Default isClearable'}
                />

                <br/>

                <Input
                    label={'Default'}
                    value={'Default filled'}
                />

                <br/>

                <Input
                    label={'Default'}
                    value={'Variant arrow'}
                    variant={'arrow'}
                />

                <br/>

                <Input
                    icon="overdue"
                    label={'Default'}
                    value={'Variant withicon'}
                    variant={'withicon'}
                />

                <br/>

                <Input
                    label={'Readonly'}
                    readOnly={true}
                />

                <br/>

                <Input
                    label={'Readonly'}
                    readOnly={true}
                    value="Readonly filled"
                />

                <br/>

                <Input
                    label={'Readonly'}
                    readOnly
                    value={'Variant arrow'}
                    variant={'arrow'}
                />

                <br/>

                <Input
                    icon="overdue"
                    label={'Readonly'}
                    readOnly
                    value={'Variant withicon'}
                    variant={'withicon'}
                />

                <br/>

                <Input
                    label={'Disabled'}
                    disabled={true}
                />

                <br/>

                <Input
                    label={'Disabled'}
                    disabled={true}
                    value="Disabled filled"
                />

                <br/>

                <Input
                    label={'Disabled'}
                    disabled
                    value={'Variant arrow'}
                    variant={'arrow'}
                />

                <br/>

                <Input
                    icon="overdue"
                    label={'Disabled'}
                    disabled
                    value={'Variant withicon'}
                    variant={'withicon'}
                />

                <br/>

                <Input
                    label="Error"
                    placeholder="Hover for tooltip"
                    state={tt ? 'error' : null}
                    tooltip={{
                        direction: 'right',
                        value: tt
                    }}
                    value={val1}
                    onChange={(e: any)=>{
                            setTt((e.target.value === '5') ? 'error' : null);
                            setVal1(e.target.value)
                        }
                    }
                />

                <br/>

                <Input
                    label="Error"
                    placeholder="Hover for tooltip"
                    state="error"
                    tooltip={{
                        direction: 'right',
                        value: 'Error Tooltip'
                    }}
                    value={val}
                    onChange={(e: any)=>setVal(e.target.value)}
                />

                <br/>

                <Input
                    label="Success"
                    placeholder="Hover for tooltip"
                    state="success"
                    tooltip={{
                        direction: 'down-right',
                        value: 'Success Tooltip'
                    }}
                />

                <br/>

                <Input label="Label"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    onBlur={(e: any)=>console.log('onBlur', e.target.value)}
                />

                <br/>

                <Input
                    label="No resize"
                    autosize={false}
                    onChange={(e: any)=>console.log('onChange', e.target.value)}
                    onEnter={(e: any)=>console.log('onEnter', e.target.value)}
                />

                <br/>

            </section>

            <section className="section-form-min">
                <h2>Size='small'</h2>

                <Input
                    isClearable={true}
                    label={'Default isClearable'}
                    size={'small'}
                />

                <br/>

                <Input
                    label={'Default'}
                    value={'Default filled'}
                    size={'small'}
                />

                <br/>

                <Input
                    label={'Default'}
                    value={'Variant arrow'}
                    variant={'arrow'}
                    size={'small'}
                />

                <br/>

                <Input
                    icon="overdue"
                    label={'Default'}
                    variant={'withicon'}
                    size={'small'}
                />

                <br/>

                <Input
                    label={'Readonly'}
                    readOnly={true}
                    size={'small'}
                />

                <br/>

                <Input
                    label={'Readonly'}
                    readOnly={true}
                    value="Readonly filled"
                    size={'small'}
                />

                <br/>

                <Input
                    label={'Readonly'}
                    readOnly
                    value={'Variant arrow'}
                    variant={'arrow'}
                    size={'small'}
                />

                <br/>

                <Input
                    icon="overdue"
                    label={'Readonly'}
                    readOnly
                    value={'Variant withicon'}
                    variant={'withicon'}
                    size={'small'}
                />

                <br/>

                <Input
                    label={'Disabled'}
                    disabled={true}
                    size={'small'}
                />

                <br/>

                <Input
                    label={'Disabled'}
                    disabled={true}
                    value="Disabled filled"
                    size={'small'}
                />

                <br/>

                <Input
                    label={'Disabled'}
                    disabled
                    value={'Variant arrow'}
                    variant={'arrow'}
                    size={'small'}
                />

                <br/>

                <Input
                    icon="overdue"
                    label={'Disabled'}
                    disabled
                    value={'Variant withicon'}
                    variant={'withicon'}
                    size={'small'}
                />

                <br/>

                <Input
                    label="Error"
                    placeholder="Hover for tooltip"
                    state={tt ? 'error' : null}
                    tooltip={{
                        direction: 'right',
                        value: tt
                    }}
                    value={val1}
                    onChange={(e: any)=>{
                            setTt((e.target.value === '5') ? 'error' : null);
                            setVal1(e.target.value)
                        }
                    }
                    size={'small'}
                />

                <br/>

                <Input
                    label="Error"
                    placeholder="Hover for tooltip"
                    state="error"
                    tooltip={{
                        direction: 'right',
                        value: 'Error Tooltip'
                    }}
                    value={val}
                    onChange={(e: any)=>setVal(e.target.value)}
                    size={'small'}
                />

                <br/>

                <Input
                    label="Success"
                    placeholder="Hover for tooltip"
                    state="success"
                    tooltip={{
                        direction: 'down-right',
                        value: 'Success Tooltip'
                    }}
                    size={'small'}
                />

                <br/>

                <Input label="Label"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    onBlur={(e: any)=>console.log('onBlur', e.target.value)}
                    size={'small'}
                />

                <br/>

                <Input
                    label="No resize"
                    autosize={false}
                    onChange={(e: any)=>console.log('onChange', e.target.value)}
                    onEnter={(e: any)=>console.log('onEnter', e.target.value)}
                    size={'small'}
                />

                <br/>

            </section>

            <section className="section-grey section-form-min">
                <h2>Color="grey"</h2>

                <Input color="grey" label="Label" placeholder="Text input" />

                <br/>

                <Input color="grey" label="Label" placeholder="Disabled" disabled />

            </section>
        </div>
    );
};

storiesOf('Controls', module)
    .add('Input', () => <Story/>);
