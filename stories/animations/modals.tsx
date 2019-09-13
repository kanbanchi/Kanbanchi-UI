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
            release={{
                footer: {
                    follow: {
                        socials: [
                            {
                                icon: 'twitter',
                                link: 'https://twitter.com/Kanbanchi',
                                name: 'Twitter'
                            },
                            {
                                icon: 'facebook',
                                link: 'https://www.facebook.com/kanbanchiapp',
                                name: 'Facebook'
                            },
                            {
                                icon: 'linkedin',
                                link: 'https://www.linkedin.com/company/kanbanchi',
                                name: 'LinkedIn'
                            },
                            {
                                icon: 'youtube',
                                link: 'https://www.youtube.com/user/kanbanchi',
                                name: 'YouTube'
                            },
                        ],
                        text: 'Follow us!'
                    },
                    stars: `Give us 5 stars in <a href="https://gsuite.google.com/marketplace/app/kanbanchi/631025100586" target="_blank">GSuite marketplace</a>`,
                },
                slides: [
                    {
                        description: `Bingo! With Shared Drives integration your team's workflow becomes even smoother. Create boards within your Shared Drives and easily work with them in a team. <a href="https://www.kanbanchi.com/faqwd/kanbanchi-boards-in-shared-drives" target="_blank">Learn more</a>`,
                        src: 'http://kanban-chi.appspot.com/dist/img/releases/2-41/2-41@2.png',
                        title: 'Shared Drives integration',
                        variant: 'img'
                    },
                    {
                        description: `You've been waiting for it desperately. Now you can buy and manage subscriptions for you and your team right within the app. More details in the video for you.`,
                        src: 'https://www.youtube.com/embed/64AQdSzGcVg?rel=0&showinfo=0',
                        title: 'Manage your Subscriptions',
                        variant: 'video'
                    }
                ]
            }}
            variant="release"
            onClose={() => setVal(null)}
        ></Modal>);

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
