import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Icon, Tooltip, Switch } from '../../src/ui';
import * as Kui from '../../src/ui';

const Story = () => {
    const [isPortal, setPortal] = React.useState(false);

    const longTooltip = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `;
    // const longTooltip = `
    //     Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    //     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    // `;
    return (
        <div className="page">
            <section style={ {width: '160px'} }>
                <Switch checked={ isPortal } onChange={ () => setPortal(!isPortal) }>
                    Portal
                </Switch>
            </section>

            <div>
                <h2>Tooltip</h2>

                <div className="stories-tooltips">

                    <div className="stories-tooltips__left">
                        <Tooltip isPortal={ isPortal }
                                 value="Direction down-right"
                                 direction="down-right"
                        >
                            <Button className={ 'test-button' } variant="icon">
                                <Icon xlink="kanban" size={ 24 }/>
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="board" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__center">
                        <Tooltip isPortal={ isPortal }
                                 value="Direction down"
                                 direction="down"
                        >
                            <Button variant="icon" title="Button title">
                                <Icon xlink="bell" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__right">
                        <Tooltip isPortal={ isPortal }
                                 value="Direction down-left"
                                 direction="down-left"
                        >
                            <Button variant="icon">
                                <Icon xlink="bell" size={ 24 }/>
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="account" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>

                    <div className="stories-tooltips__left">
                        <Tooltip isPortal={ isPortal }
                                 value="Direction right"
                                 direction="right"
                        >
                            <Button variant="icon">
                                <Icon xlink="tag" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__center"></div>
                    <div className="stories-tooltips__right">
                        <Tooltip isPortal={ isPortal }
                                 value="Direction left"
                                 direction="left"
                        >
                            <Button variant="icon">
                                <Icon xlink="clear" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>

                    <div className="stories-tooltips__left">
                        <Tooltip isPortal={ isPortal }
                                 value="Direction up-right"
                                 direction="up-right"
                        >
                            <Button variant="icon">
                                <Icon xlink="board-template" size={ 24 }/>
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="board-favorite" size={ 24 }/>
                            </Button>
                        </Tooltip>

                    </div>
                    <div className="stories-tooltips__center">
                        <Tooltip isPortal={ isPortal }
                                 value="Direction up (default)"
                        >
                            <Button variant="icon">
                                <Icon xlink="plus" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__right">
                        <Tooltip isPortal={ isPortal }
                                 value="Error Direction up-left"
                                 direction="up-left"
                                 state="error"
                        >
                            <Button variant="icon">
                                <Icon xlink="help" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>

                    <div className="stories-tooltips__left">
                        <Tooltip isPortal={ isPortal }
                                 value="Lorem ipsum dolor sit amet"
                        >
                            <Button variant="icon">
                                <Icon xlink="board-template" size={ 24 }/>
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="board-favorite" size={ 24 }/>
                            </Button>
                        </Tooltip>

                    </div>
                    <div className="stories-tooltips__center">
                        <Tooltip isPortal={ isPortal }
                                 value="Lorem ipsum dolor sit amet"
                        >
                            <Button variant="icon">
                                <Icon xlink="plus" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__right">
                        <Tooltip
                            //isPortal={isPortal}
                            value="Help"
                            delayClose={ 100000 }
                        >
                            <Button
                                style={ {
                                    width: '56px',
                                    height: '56px',
                                    background: 'blue'
                                } }
                                variant="icon"
                            >
                                <Icon xlink="help" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>
                </div>

            </div>

            <section>
                <h2>Long Tooltip</h2>

                <div className="stories-tooltips">

                    <div className="stories-tooltips__left">
                        <Tooltip isPortal={ isPortal }
                                 value={ longTooltip }
                                 direction="down-right"
                        >
                            <Button variant="icon">
                                <Icon xlink="kanban" size={ 24 }/>
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="board" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__center">
                        <Tooltip isPortal={ isPortal }
                                 value={ longTooltip }
                                 direction="down"
                        >
                            <Button variant="icon" title="Button title">
                                <Icon xlink="bell" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__right">
                        <Tooltip isPortal={ isPortal }
                                 value={ longTooltip }
                                 direction="down-left"
                        >
                            <Button variant="icon">
                                <Icon xlink="bell" size={ 24 }/>
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="account" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>

                    <div className="stories-tooltips__left">
                        <Tooltip isPortal={ isPortal }
                                 value={ longTooltip }
                                 direction="right"
                        >
                            <Button variant="icon">
                                <Icon xlink="tag" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__center"></div>
                    <div className="stories-tooltips__right">
                        <Tooltip isPortal={ isPortal }
                                 value={ longTooltip }
                                 direction="left"
                        >
                            <Button variant="icon">
                                <Icon xlink="clear" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>

                    <div className="stories-tooltips__left">
                        <Tooltip isPortal={ isPortal }
                                 value={ longTooltip }
                                 direction="up-right"
                        >
                            <Button variant="icon">
                                <Icon xlink="board-template" size={ 24 }/>
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="board-favorite" size={ 24 }/>
                            </Button>
                        </Tooltip>

                    </div>
                    <div className="stories-tooltips__center">
                        <Tooltip isPortal={ isPortal }
                                 value={ longTooltip }
                        >
                            <Button variant="icon">
                                <Icon xlink="plus" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="stories-tooltips__right">
                        <Tooltip isPortal={ isPortal }
                                 value={ longTooltip }
                                 direction="up-left"
                                 state="error"
                        >
                            <Button variant="icon">
                                <Icon xlink="help" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>

                    <div className="stories-tooltips__left">
                        <Tooltip isPortal={ isPortal }
                                 value={ longTooltip }
                                 direction="up"
                                 delayClose={ 100000 }
                        >
                            <Button variant="icon">
                                <Icon xlink="board-template" size={ 24 }/>
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="board-favorite" size={ 24 }/>
                            </Button>
                        </Tooltip>

                    </div>
                    <div className="stories-tooltips__right">
                        <Tooltip isPortal={ isPortal }
                                 value={ longTooltip }
                                 direction="up"
                                 state="error"
                                 delayClose={ 100000 }
                        >
                            <Button variant="icon">
                                <Icon xlink="help" size={ 24 }/>
                            </Button>
                        </Tooltip>
                    </div>
                </div>

                <br/>

                Check empty Tooltip: <Tooltip isPortal={ isPortal } value={ '1' }></Tooltip>
            </section>

            <section>
                <h2>delayClose</h2>

                <Tooltip isPortal={ isPortal }
                         direction={ 'right' }
                         value="Connect related tasks <br/>to switch between them <br/>quickly."
                         link={ <a href="#1" onClick={ () => console.log('You learned more') }>Click to learn more</a> }
                    // value={longTooltip}
                         delayClose={ 500 }
                         onShow={ () => console.log('shown') }
                >
                    <Button
                        variant={ 'icon' }
                    >
                        <Icon xlink="info" size={ 16 }/>
                    </Button>
                </Tooltip>

                <Tooltip isPortal={ isPortal }
                         direction={ 'right' }
                         value="Connect related tasks <br/>to switch between them <br/>quickly."
                         footer={ <Button color={ 'white' } onClick={ () => console.log('Ok') }>Ok</Button> }
                         delayClose={ 500 }
                >
                    <Button
                        variant={ 'icon-text' }
                        text={ 'Buttons' }
                        style={ {marginLeft: 200} }
                    >
                        <Icon xlink="info" size={ 24 }/>
                    </Button>
                </Tooltip>
            </section>

            <section>

                <p>ForwardRef check below:</p>

                <h2>ButtonDropdown</h2>

                <Tooltip isPortal={ isPortal }
                         value="Test"
                >
                    <Kui.ButtonDropdown>
                        <Button variant="action">
                            Actions Right
                        </Button>
                        <Kui.SelectList fixActive={ false }>
                            <li>¯\_(ツ)_/¯</li>
                        </Kui.SelectList>
                    </Kui.ButtonDropdown>
                </Tooltip>
            </section>

            <section>
                <h2>ButtonsGroup</h2>

                <Tooltip isPortal={ isPortal }
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

                <Tooltip isPortal={ isPortal }
                         value="Test"
                >
                    <Kui.ButtonsSegmented
                        active={ 0 }
                        onChange={ () => {
                        } }
                    >
                        <Button>1</Button>
                        <Button>2</Button>
                    </Kui.ButtonsSegmented>
                </Tooltip>
            </section>

            <section>
                <h2>Checkbox</h2>

                <Tooltip isPortal={ isPortal }
                         value="Test"
                >
                    <Kui.Checkbox onChange={ () => {
                    } }>
                        Test
                    </Kui.Checkbox>
                </Tooltip>
            </section>

            <section>
                <h2>Datepicker</h2>

                <Tooltip isPortal={ isPortal }
                         value="Test"
                >
                    <Kui.Datepicker
                        selected={ new Date() }
                        onChange={ () => {
                        } }/>
                </Tooltip>
            </section>

            <section>
                <h2>Icon</h2>

                <Tooltip isPortal={ isPortal }
                         value="Test"
                >
                    <Kui.Icon xlink="help" size={24}/>
                </Tooltip>
            </section>

            <section>
                <h2>Input</h2>

                <Tooltip isPortal={ isPortal }
                         value="Test"
                >
                    <Kui.Input/>
                </Tooltip>
            </section>

            <section>
                <h2>Label</h2>

                <Tooltip isPortal={ isPortal }
                         value="Test"
                >
                    <Kui.Label>
                        Test
                    </Kui.Label>
                </Tooltip>
            </section>

            <section>
                <h2>Radio</h2>

                <Tooltip isPortal={ isPortal }
                         value="Test"
                >
                    <Kui.Radio onChange={ () => {
                    } }>
                        <div>1</div>
                        <div>2</div>
                    </Kui.Radio>
                </Tooltip>
            </section>

            <section>
                <h2>Search</h2>

                <Tooltip isPortal={ isPortal }
                         value="Test"
                >
                    <Kui.Search onChange={ () => {
                    } }>
                        <Kui.SelectList>
                            <li>1</li>
                            <li>2</li>
                        </Kui.SelectList>
                    </Kui.Search>
                </Tooltip>
            </section>

            <section>
                <h2>Select</h2>

                <Tooltip isPortal={ isPortal }
                         value="Test"
                >
                    <Kui.Select onChange={ () => {
                    } }>
                        <Kui.SelectList>
                            <li>1</li>
                            <li>2</li>
                        </Kui.SelectList>
                    </Kui.Select>
                </Tooltip>
            </section>

            <section>
                <h2>Switch</h2>

                <Tooltip isPortal={ isPortal }
                         value="Test"
                >
                    <Kui.Switch
                        checked={ true }
                        onChange={ () => {
                        } }>
                        Test
                    </Kui.Switch>
                </Tooltip>
            </section>

            <section>
                <h2>Tabs</h2>

                <Tooltip isPortal={ isPortal }
                         value="Test"
                >
                    <Kui.Tabs
                        active={ 0 }
                        onChange={ () => {
                        } }
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
