import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Icon, Tooltip } from '../../src/ui';
import * as Kui from '../../src/ui';

const Story = () => {
    return (
        <div className="page">
             <section>
                <h2>Tooltip</h2>

                <div className="stories-tooltips">

                    <div className="stories-tooltips__left">
                        <Tooltip
                            value="Direction down-right"
                            direction="down-right"
                        >
                            <Button variant="icon">
                                <Icon xlink="kanban" size={24} />
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="board" size={24} />
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__center">
                        <Tooltip
                            value="Default tolltip"
                        >
                            <Button variant="icon" title="Button title">
                                <Icon xlink="bell" size={24} />
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__right">
                        <Tooltip
                            value="Direction down-left"
                            direction="down-left"
                        >
                            <Button variant="icon">
                                <Icon xlink="bell" size={24} />
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="account" size={24} />
                            </Button>
                        </Tooltip>
                    </div>

                    <div className="stories-tooltips__left">
                        <Tooltip
                            value="Direction right"
                            direction="right"
                        >
                            <Button variant="icon">
                                <Icon xlink="tag" size={24} />
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__center"></div>
                    <div className="stories-tooltips__right">
                        <Tooltip
                            value="Direction left"
                            direction="left"
                        >
                            <Button variant="icon">
                                <Icon xlink="trash" size={24} />
                            </Button>
                        </Tooltip>
                    </div>

                    <div className="stories-tooltips__left">
                        <Tooltip
                            value="Direction up-right"
                            direction="up-right"
                        >
                            <Button variant="icon">
                                <Icon xlink="project-template" size={24} />
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="project-favorite" size={24} />
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__center">
                        <Tooltip
                            value="Direction up"
                            direction="up"
                        >
                            <Button variant="icon">
                                <Icon xlink="plus" size={24} />
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__right">
                        <Tooltip
                            value="Error Direction up-left"
                            direction="up-left"
                            state="error"
                        >
                            <Button variant="icon">
                                <Icon xlink="help" size={24} />
                            </Button>
                        </Tooltip>
                    </div>

                </div>
            </section>

            <section>

                <p>ForwardRef check below:</p>

                <h2>ButtonDropdown</h2>

<Tooltip
    value="Test"
>
    <Kui.ButtonDropdown>
        <Button variant="action">
            Actions Right
        </Button>
        <Kui.SelectList fixActive={false}>
            <li>¯\_(ツ)_/¯</li>
        </Kui.SelectList>
    </Kui.ButtonDropdown>
</Tooltip>
            </section>

            <section>
                <h2>ButtonsGroup</h2>

<Tooltip
    value="Test"
>
    <Kui.ButtonsGroup>
        <Button>1</Button>
        <Button>2</Button>
    </Kui.ButtonsGroup>
</Tooltip>
            </section>

            <section>
                <h2>ButtonsSegmented</h2>

<Tooltip
    value="Test"
>
    <Kui.ButtonsSegmented
        active={0}
        onChange={()=>{}}
    >
        <Button>1</Button>
        <Button>2</Button>
    </Kui.ButtonsSegmented>
</Tooltip>
            </section>

            <section>
                <h2>Checkbox</h2>

<Tooltip
    value="Test"
>
    <Kui.Checkbox onChange={()=>{}}>
        Test
    </Kui.Checkbox>
</Tooltip>
            </section>

            <section>
                <h2>Datepicker</h2>

<Tooltip
    value="Test"
>
    <Kui.Datepicker
        selected={new Date()}
        onChange={()=>{}} />
</Tooltip>
            </section>

            <section>
                <h2>Icon</h2>

<Tooltip
    value="Test"
>
    <Kui.Icon xlink="help" />
</Tooltip>
            </section>

            <section>
                <h2>Input</h2>

<Tooltip
    value="Test"
>
    <Kui.Input />
</Tooltip>
            </section>

            <section>
                <h2>Label</h2>

<Tooltip
    value="Test"
>
    <Kui.Label>
        Test
    </Kui.Label>
</Tooltip>
            </section>

            <section>
                <h2>Radio</h2>

<Tooltip
    value="Test"
>
    <Kui.Radio>
        <div>1</div>
        <div>2</div>
    </Kui.Radio>
</Tooltip>
            </section>

            <section>
                <h2>Search</h2>

<Tooltip
    value="Test"
>
    <Kui.Search onChange={()=>{}}>
        <Kui.SelectList>
            <li>1</li>
            <li>2</li>
        </Kui.SelectList>
    </Kui.Search>
</Tooltip>
            </section>

            <section>
                <h2>Select</h2>

<Tooltip
    value="Test"
>
    <Kui.Select onChange={()=>{}}>
        <Kui.SelectList>
            <li>1</li>
            <li>2</li>
        </Kui.SelectList>
    </Kui.Select>
</Tooltip>
            </section>

            <section>
                <h2>Switch</h2>

<Tooltip
    value="Test"
>
    <Kui.Switch
        checked={true}
        onChange={()=>{}}>
        Test
    </Kui.Switch>
</Tooltip>
            </section>

            <section>
                <h2>Tabs</h2>

<Tooltip
    value="Test"
>
    <Kui.Tabs
        active={0}
        onChange={()=>{}}
    >
        <Button>1</Button>
        <Button>2</Button>
    </Kui.Tabs>
</Tooltip>
            </section>

        </div>
    );
};

storiesOf('Animations', module)
    .add('Tooltip', () => <Story/>);
