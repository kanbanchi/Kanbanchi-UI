import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Modal, ButtonsGroup, Button } from '../../src/ui';

const Story = () => {
    const [val, setVal] = React.useState(null);

    const modalDefault = (<Modal
            title={'Default modal'}
            onClose={() => setVal(null)}
        >
            <h3>Content header</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Modal>);

    const modalActions = (<Modal
            title={'Actions modal'}
            buttons={[
                {
                    text: 'Cancel',
                    onClick: () => console.log('cancel')
                },
                {
                    text: 'Ok',
                    isPrimary: true,
                    onClick: () => console.log('ok')
                }
            ]}
            variant="actions"
            onClose={() => setVal(null)}
        >
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?</p>
        </Modal>);

    const modalRelease = (<Modal
            title={'Release modal'}
            variant="release"
            onClose={() => setVal(null)}
        >
            <h3>Content header</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Modal>);

    return (
        <div className="page">
             <section className="section-form-min">
                <h2>Modals</h2>

                {val}

                <ButtonsGroup>
                    <Button
                        onClick={() => setVal(modalDefault)}
                    >
                        Default
                    </Button>
                    <Button
                        onClick={() => setVal(modalActions)}
                    >
                        Actions
                    </Button>
                    <Button
                        onClick={() => setVal(modalRelease)}
                    >
                        Release
                    </Button>
                </ButtonsGroup>

                <br/>

                <ButtonsGroup>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setVal(modalDefault);
                            setTimeout(() => {
                                setVal(null);
                                setVal(modalActions);
                            }, 2000);
                        }}
                    >
                        2 modals with timeout
                    </Button>
                </ButtonsGroup>

                <br/><br/>

                <h4>The standard Lorem Ipsum passage, used since the 1500s</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            </section>
        </div>
    );
};

storiesOf('Animations', module)
    .add('Modals', () => <Story/>);
