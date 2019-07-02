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
                <h2>Promt</h2>
                <Snackbar
                    key="1"
                    variant="promt"
                    text={'Please, don\'t close this page during the process to avoid data loss'}
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
                    key="1"
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
                    key="1"
                    variant="success"
                    text = "To Teamdrive long name Lorem ipsum"
                    title = "Board 'Board long name Lorem ipsum' has been moved"
                    buttons={[
                        {
                            text: 'Ok'
                        }
                    ]}
                />
            </section>

            <SnackbarsQueue ref={queueRef} />
        </div>
    );
};

storiesOf('WIP', module)
    .add('TeamDrive', () => <Story />);
