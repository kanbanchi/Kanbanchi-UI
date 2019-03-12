import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Tabs, Input, Search, Switch, Radio, Checkbox, Datepicker, Dropdown } from '../../ui';
class StoryControls extends React.Component {
    constructor() {
        super();
        this.onTabsClick = this.onTabsClick.bind(this);
        this.state = {
            tab: 0
        };
    }
    onTabsClick(i) {
        this.setState({
            tab: i
        });
    }
    render() { 
        return (
            <div className="page">
                <section>
                    <h2>Tabs</h2>
                    <div>
                        <p><b>Default</b></p>
                        <Tabs
                            active={this.state.tab}
                            action={this.onTabsClick}
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
                            active={this.state.tab}
                            action={this.onTabsClick}
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

                <section>
                    <h2>Input</h2>
                    <Input label="Label" placeholder="Text input" />
                    <br/>
                    <Input placeholder="Without label" />
                    <br/>
                    <Input label="Label" placeholder="Disabled" disabled />
                </section>

                <section className="section-grey">
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

                <section>
                    <h2>Switch</h2>
                    <Switch>
                        Label
                    </Switch>
                </section>

                <section>
                    <h2>Radio</h2>
                    <Radio>
                        Label
                    </Radio>
                </section>

                <section>
                    <h2>Checkbox</h2>
                    <Checkbox>
                        Label
                    </Checkbox>
                </section>

                <section>
                    <h2>Datepicker</h2>
                    <Datepicker>
                        Label
                    </Datepicker>
                </section>

                <section>
                    <h2>Dropdown</h2>
                    <Dropdown>
                        Label
                    </Dropdown>
                </section>

            </div>
        )
    } 
};

storiesOf('KUI', module)
    .add('controls', () => <StoryControls/>);
