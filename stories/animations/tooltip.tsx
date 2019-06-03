import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Icon, Tooltip } from '../../src/ui';

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
                            value="Direction up-left"
                            direction="up-left"
                        >
                            <Button variant="icon">
                                <Icon xlink="help" size={24} />
                            </Button>
                        </Tooltip>
                    </div>

                </div>

            </section>
        </div>
    );
};

storiesOf('Animations', module)
    .add('Tooltip', () => <Story/>);
