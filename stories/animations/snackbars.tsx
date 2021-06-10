import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Snackbar } from './../../src/ui';
import SnackbarsQueue from './../snackbarsQueue';

const Story = () => {
    const queueRef = React.useRef(null);
    const triggerQueueAddSnackbar = () => {
        queueRef.current.AddSnackbar();
    }

    const [progressHook, setProgressHook] = React.useState(0);
    const [s] = React.useState<any>({});
    const [getProgressHook] = React.useState(() => () => s.progressHook);
    s.progressHook = progressHook;
    const [intervalHook, setIntervalHook] = React.useState(null);

    React.useEffect(() => {
        let unmounted = false;
        setIntervalHook(setInterval(() => {
            if (unmounted) return;
            let progress = (getProgressHook() >= 100) ? 0 : getProgressHook() + 1;
            setProgressHook(progress);
        }, 100));

        return () => {
            unmounted = true;
            clearInterval(intervalHook);
        };
    }, []);

    return (
        <div className="page">
            <section className="snackbars">
                <Button onClick={()=>triggerQueueAddSnackbar()}>
                    Show popup
                </Button>
                <br />
                <br />

                <h2>Error</h2>
                <Snackbar
                    key="1"
                    variant="error"
                    text="The <b>email</b> address is not valid. Please, use name@domain.com format."
                />
                <br />
                <Snackbar
                    key="2"
                    variant="error"
                    text="The maximum number of seats is exceeded. <br>Click Manage subscription to buy more seats."
                    buttons={[
                        { text: 'Close' }
                    ]}
                />

                <h2>Timer</h2>
                <Snackbar
                    key="3"
                    variant="timer"
                    timer={55}
                    text={'Removing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                    buttons={[
                        {
                            text: 'Ok',
                            isPrimary: true,
                            onClick: () => console.log('ok')
                        },
                        {
                            text: 'Cancel',
                            onClick: () => console.log('cancel')
                        }
                    ]}
                />
                <br />
                <Snackbar
                    key="4"
                    timer={5}
                    variant="error"
                    text="Error text shown 5 seconds"
                />
            </section>

            <section className="snackbars">
                <h2>Info</h2>
                <Snackbar
                    key="5"
                    title="We've updated the app!"
                    text="Click to refresh the page and receive updates"
                    buttons={[
                        {
                            text: 'Refresh',
                            onClick: () => window.location.reload()
                        }
                    ]}
                />
            </section>

            <section className="snackbars">
                <h2>Promt</h2>
                <Snackbar
                    key="6"
                    variant="promt"
                    text={'It may take some time'}
                    title={'We will move your board'}
                    buttons={[
                        {
                            text: 'Start',
                            isPrimary: true
                        },
                        {
                            text: 'Cancel'
                        }
                    ]}
                />
            </section>

            <section className="snackbars">
                <h2>Progress</h2>
                <Snackbar
                    key="7"
                    title="We are moving your board"
                    text="It may take some time"
                    buttons={[
                        {
                            progress: progressHook,
                            text: progressHook + '%'
                        }
                    ]}
                />
            </section>

            <section className="snackbars">
                <h2>Success</h2>
                <Snackbar
                    key="8"
                    variant="success"
                    title="Data has been successfully exported"
                    text="We've sent you an email with the link"
                    buttons={[
                        {
                            text: 'Open the link',
                            onClick: () => console.log('Open the link')
                        }
                    ]}
                />
            </section>

            <Snackbar
                key="3"
                variant="undo"
                timer={10}
                text={'Card is deleted'}
                position={'right'}
                buttons={[
                    {
                        text: 'Undo',
                        onClick: () => console.log('Undo')
                    },
                    {
                        text: 'Close',
                        onClick: () => console.log('Close'),
                        icon: 'close'
                    }
                ]}
            />

            <SnackbarsQueue ref={queueRef} />
        </div>
    );
};

storiesOf('Animations', module)
    .add('Snackbars', () => <Story />);
