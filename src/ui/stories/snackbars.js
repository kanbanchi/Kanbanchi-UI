import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Snackbar } from '../../ui';
import SnackbarsQueue from './snackbarsQueue';

class StorySnackbars extends React.Component {
    constructor() {
        super();
        this.triggerQueueAddSnackbar = this.triggerQueueAddSnackbar.bind(this);        
    }    
    triggerQueueAddSnackbar() {
        this.refs.queue.AddSnackbar();
    }
    render() {
        return (
            <div className="page">
                <section className="snackbars">
                    <Button onClick={this.triggerQueueAddSnackbar}>
                        Show popup
                    </Button>
                    <br />
                    <br />

                    <h2>Error</h2>
                    1
                    <br />
                    2
                    <br />
                    3
                    <Snackbar
                        variant="error"
                        text="The email address is not valid. Please, use name@domain.com format."
                    />
                    <br />
                    <Snackbar
                        variant="error"
                        text="The maximum number of seats is exceeded. <br>Click Manage subscription to buy more seats."
                        buttons={[
                            { text: 'Close' }
                        ]}
                    />

                    <h2>Timer</h2>
                    <Snackbar
                        variant="timer"
                        timer={55}
                        text={"Removing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                        buttons={[
                            {
                                text: 'Cancel',
                                onClick: () => console.log('cancel')
                            },
                            {
                                text: 'Ok',
                                onClick: () => console.log('ok'),
                                onTimer: true
                            }
                        ]}
                    />
                    <br />
                    <Snackbar
                        timer={5}
                        variant="error"
                        text="Error text shown 5 seconds"
                    />
                </section>
                <section className="snackbars">
                    <h2>Info</h2>
                    <Snackbar
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
                    <h2>Success</h2>
                    <Snackbar
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

                <SnackbarsQueue ref="queue" />
            </div>
        )
    }
};

storiesOf('KUI', module)
    .add('snackbars', () => <StorySnackbars />);
