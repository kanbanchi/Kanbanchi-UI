import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Icon, Hint, Switch } from '../../src/ui';

const Story = () => {
    const [isPortal, setPortal] = React.useState(true);
    const valueFlag = React.useRef(false);

    const shortTooltip = `Lorem ipsum dolor sit amet.`;

    const longTooltip = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `;

    const [value, setValue] = React.useState(shortTooltip);
    const [show, setShow] = React.useState(true);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setShow(false);
            setTimeout(() => {
                if (valueFlag.current) {
                    setValue(shortTooltip);
                } else {
                    setValue(longTooltip);
                }
                valueFlag.current = !valueFlag.current;
                setShow(true);
            }, 500);
        }, 2000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div
            className="page section-portal section-relative"
            key={`hints--portal_${isPortal}`}
        >
            <section style={{width: '160px'}}>
                <Switch checked={isPortal} onChange={() => setPortal(!isPortal)}>
                    Portal
                </Switch>
            </section>

             <section>
                <h2>Hint</h2>

                <div className="stories-tooltips">

                    <div className="stories-tooltips__left">
                        <Hint
                            arrow={'up'}
                            arrowTranslate={{left: 28}}
                            value={'down-right'}
                            direction="down-right"
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="kanban" size={24} />
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="board" size={24} />
                            </Button>
                        </Hint>
                    </div>
                    <div className="stories-tooltips__center">
                        <Hint
                            arrow={'up'}
                            value={value}
                            show={show}
                            direction="down"
                            isPortal={isPortal}
                        >
                            <Button variant="icon" title="Button title">
                                <Icon xlink="bell" size={24} />
                            </Button>
                        </Hint>
                    </div>
                    <div className="stories-tooltips__right">
                        <Hint
                            arrow={'up'}
                            arrowTranslate={{right: 44}}
                            translate={{right: -24}}
                            value="Direction down-left"
                            direction="down-left"
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="bell" size={24} />
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="account" size={24} />
                            </Button>
                        </Hint>
                    </div>

                    <div className="stories-tooltips__left">
                        <Hint
                            arrow={'left'}
                            value="Direction right"
                            direction="right"
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="tag" size={24} />
                            </Button>
                        </Hint>
                    </div>
                    <div className="stories-tooltips__center"></div>
                    <div className="stories-tooltips__right">
                        <Hint
                            arrow={'right'}
                            value="Direction left"
                            direction="left"
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="delete" size={24} />
                            </Button>
                        </Hint>
                    </div>

                    <div className="stories-tooltips__left">
                        <Hint
                            arrowTranslate={{left: 28}}
                            value="Direction up-right"
                            direction="up-right"
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="project-template" size={24} />
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="project-favorite" size={24} />
                            </Button>
                        </Hint>

                    </div>
                    <div className="stories-tooltips__center">
                        <Hint
                            value="Direction up (default)"
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="plus" size={24} />
                            </Button>
                        </Hint>
                    </div>
                    <div className="stories-tooltips__right">
                        <Hint
                            arrowTranslate={{right: 34}}
                            translate={{right: -14}}
                            value="Error Direction up-left"
                            direction="up-left"
                            state="error"
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="help" size={24} />
                            </Button>
                        </Hint>
                    </div>
                </div>
            </section>

            <section>
                <h2>Hint</h2>

                <div className="stories-tooltips">

                    <div className="stories-tooltips__left">
                        <Hint
                            arrow={'up'}
                            arrowTranslate={{left: 28}}
                            value={longTooltip}
                            direction="down-right"
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="kanban" size={24} />
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="board" size={24} />
                            </Button>
                        </Hint>
                    </div>
                    <div className="stories-tooltips__center">
                        <Hint
                            arrow={'up'}
                            header="Header"
                            value={longTooltip}
                            direction="down"
                            isPortal={isPortal}
                        >
                            <Button variant="icon" title="Button title">
                                <Icon xlink="bell" size={24} />
                            </Button>
                        </Hint>
                    </div>
                    <div className="stories-tooltips__right">
                        <Hint
                            arrow={'up'}
                            arrowTranslate={{right: 34}}
                            translate={{right: -14}}
                            value={longTooltip}
                            direction="down-left"
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="bell" size={24} />
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="account" size={24} />
                            </Button>
                        </Hint>
                    </div>

                    <div className="stories-tooltips__left">
                        <Hint
                            arrow={'left'}
                            value={longTooltip}
                            direction="right"
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="tag" size={24} />
                            </Button>
                        </Hint>
                    </div>
                    <div className="stories-tooltips__center"></div>
                    <div className="stories-tooltips__right">
                        <Hint
                            arrow={'right'}
                            value={longTooltip}
                            direction="left"
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="delete" size={24} />
                            </Button>
                        </Hint>
                    </div>

                    <div className="stories-tooltips__left">
                        <Hint
                            arrowTranslate={{left: 28}}
                            value={longTooltip}
                            direction="up-right"
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="project-template" size={24} />
                            </Button>
                            <Button variant="icon">
                                <Icon xlink="project-favorite" size={24} />
                            </Button>
                        </Hint>

                    </div>
                    <div className="stories-tooltips__center">
                        <Hint
                            value={longTooltip}
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="plus" size={24} />
                            </Button>
                        </Hint>
                    </div>
                    <div className="stories-tooltips__right">
                        <Hint
                            arrowTranslate={{right: 34}}
                            translate={{right: -14}}
                            value={longTooltip}
                            direction="up-left"
                            state="error"
                            isPortal={isPortal}
                        >
                            <Button variant="icon">
                                <Icon xlink="help" size={24} />
                            </Button>
                        </Hint>
                    </div>
                </div>
            </section>

            <section>
                <h2>delayClose</h2>

                <h2 style={{
                    display: 'inline-flex',
                    justifyContent: 'center'
                }}>
                    Board
                    <Hint
                        arrow={'up'}
                        arrowTranslate={{left: 32}}
                        translate={{left: -28}}
                        direction={'down-right'}
                        value="Tune your board here"
                        onShow={()=>console.log('show')}
                        onHide={()=>console.log('hide')}
                        isPortal={isPortal}
                    >
                        <Button
                            variant={'icon'}
                            onClick={()=>console.log('click Dots')}
                        >
                            <Icon size={24} xlink={'more'} />
                        </Button>
                    </Hint>
                </h2>
            </section>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        </div>
    );
};

storiesOf('Animations', module)
    .add('Hint', () => <Story/>);
