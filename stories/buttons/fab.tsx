import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonsGroup, Icon } from '../../src/ui';

const Story = () => {
    return (
        <div className="page">
             <section>
                <h2>FAB</h2>
                <ButtonsGroup>
                    <Button variant="fab"
                        tooltip={'Search <strong>Text</strong>'}
                    >
                        <Icon xlink="search" size={24} />
                    </Button>
                    <Button variant="fab" disabled>
                        <Icon xlink="search" size={24} />
                    </Button>
                </ButtonsGroup>

                <br />

                <ButtonsGroup size="large">
                    <Button variant="fab" text="Fab with text">
                        <Icon xlink="search" size={24} />
                    </Button>
                    <Button variant="fab" text="Fab with text" disabled>
                        <Icon xlink="search" size={24} />
                    </Button>
                </ButtonsGroup>

            </section>
            <section>
                <h2>Color="purple"</h2>
                <ButtonsGroup>
                    <Button variant="fab" color="purple"
                        tooltip={{
                            header: 'Tooltip <strong>header</strong>',
                            value: 'Plus',
                        }}
                    >
                        <Icon xlink="plus" size={24} />
                    </Button>
                    <Button variant="fab" color="purple" disabled>
                        <Icon xlink="plus" size={24} />
                    </Button>
                </ButtonsGroup>

                <br />

                <ButtonsGroup size="large">
                    <Button variant="fab" color="purple" text="Fab with text">
                        <Icon xlink="plus" size={24} />
                    </Button>
                    <Button variant="fab" color="purple" text="Fab with text" disabled>
                        <Icon xlink="plus" size={24} />
                    </Button>
                </ButtonsGroup>

            </section>
            <section>
                <h2>Color="black"</h2>

                <ButtonsGroup>
                    <Button variant="fab" color="black">
                        <Icon xlink="kanban" size={24} />
                    </Button>
                    <Button variant="fab" color="black" disabled>
                        <Icon xlink="kanban" size={24} />
                    </Button>
                </ButtonsGroup>

                <br />

                <ButtonsGroup size="large">
                    <Button variant="fab" color="black" text="Fab with text">
                        <Icon xlink="kanban" size={24} />
                    </Button>
                    <Button variant="fab" color="black" text="Fab with text" disabled>
                        <Icon xlink="kanban" size={24} />
                    </Button>
                </ButtonsGroup>

            </section>
            <section className="section-black">
                <h2>Color="white"</h2>
                <ButtonsGroup>
                    <Button variant="fab" color="white">
                        <Icon xlink="search" size={24} />
                    </Button>
                    <Button variant="fab" color="white" disabled>
                        <Icon xlink="search" size={24} />
                    </Button>
                </ButtonsGroup>

                <br />

                <ButtonsGroup size="large">
                    <Button variant="fab" color="white" text="Fab with text">
                        <Icon xlink="search" size={24} />
                    </Button>
                    <Button variant="fab" color="white" text="Fab with text" disabled>
                        <Icon xlink="search" size={24} />
                    </Button>
                </ButtonsGroup>
            </section>
        </div>
    );
};

storiesOf('Buttons', module)
    .add('Fab', () => <Story/>);
