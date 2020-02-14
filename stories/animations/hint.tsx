import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Icon, Hint } from '../../src/ui';

const Story = () => {
    return (
        <div className="page">
             <section>
                <h2>Hint</h2>

                <div className="stories-tooltips">

                    <div className="stories-tooltips__left">
                        <Hint
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
                            value="Error Direction up-left"
                            direction="up-left"
                            state="error"
                        >
                            <Button variant="icon">
                                <Icon xlink="help" size={24} />
                            </Button>
                        </Hint>
                    </div>

                    <div className="stories-tooltips__left">
                        <Hint
                            value="Lorem ipsum dolor sit amet"
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
                            value="Lorem ipsum dolor sit amet"
                        >
                            <Button variant="icon">
                                <Icon xlink="plus" size={24} />
                            </Button>
                        </Hint>
                    </div>
                    <div className="stories-tooltips__right">
                        <Hint
                            value="Error Lorem ipsum dolor sit amet"
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

                <Hint
                    direction={'down'}
                    value="Connect related tasks <br/>to switch between them <br/>quickly."
                    link={<a href="#1" onClick={()=>console.log('You learned more')}>Click to learn more</a>}
                >
                    <Button
                        variant={'text'}
                    >
                        Link
                    </Button>
                </Hint>

                <Hint
                    direction={'right'}
                    value="Connect related tasks <br/>to switch between them <br/>quickly."
                    footer={<Button color={'white'} onClick={()=>console.log('Ok')}>Ok</Button>}
                >
                    <Button
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
