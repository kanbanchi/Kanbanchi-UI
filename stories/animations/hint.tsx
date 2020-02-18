import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Icon, Hint } from '../../src/ui';

const Story = () => {
    let [showHint, setShowHint] = React.useState(false);

    React.useEffect(() => {
        let showHintTimer = setInterval(() => {
            showHint = !showHint
            setShowHint(showHint);
        }, 2000);

        return () => {
            clearInterval(showHintTimer);
        };
    }, []);

    return (
        <div className="page">
             <section>
                <h2>Hint</h2>

                <div className="stories-tooltips">

                    <div className="stories-tooltips__left">
                        <Hint
                            arrow={'up'}
                            arrowTranslate={{left: 28}}
                            value="Direction down-right"
                            direction="down-right"
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
                            value="Direction down"
                            direction="down"
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
                            translate={{left: 24}}
                            value="Direction down-left"
                            direction="down-left"
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
                        >
                            <Button variant="icon">
                                <Icon xlink="trash" size={24} />
                            </Button>
                        </Hint>
                    </div>

                    <div className="stories-tooltips__left">
                        <Hint
                            arrowTranslate={{left: 28}}
                            value="Direction up-right"
                            direction="up-right"
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
                        >
                            <Button variant="icon">
                                <Icon xlink="plus" size={24} />
                            </Button>
                        </Hint>
                    </div>
                    <div className="stories-tooltips__right">
                        <Hint
                            arrowTranslate={{right: 44}}
                            translate={{left: 24}}
                            value="Error Direction up-left"
                            direction="up-left"
                            state="error"
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
                    >
                        <Button
                            variant={'icon'}
                        >
                            <Icon size={24} xlink={'dots'} />
                        </Button>
                    </Hint>
                </h2>

                <Hint
                    direction={'up'}
                    value="Connect related tasks <br/>to switch between them <br/>quickly."
                    footer={<Button color={'white'} onClick={()=>console.log('Ok')}>Ok</Button>}
                    show={showHint}
                >
                    <Button
                         style={{marginLeft: '200px'}}
                        variant={'text'}
                    >
                        Buttons
                    </Button>
                </Hint>
            </section>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        </div>
    );
};

storiesOf('Animations', module)
    .add('Hint', () => <Story/>);
