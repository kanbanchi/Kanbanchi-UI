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
                    <Snackbar
                        variant="error"
                        text="The email address is not valid. Please, use name@domain.com format."
                    />
                    <Snackbar
                        variant="error"
                        text="The maximum number of seats is exceeded. <br>Click Manage subscription to buy more seats."
                        buttonAction="Close"
                    />

                    <h2>Timer</h2>
                    <Snackbar
                        variant="timer"
                        timer={55}
                        text={"Removing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                        buttonAction="Ok"
                        buttonCancel="Cancel"
                        onAction={() => console.log('action')}
                        onCancel={() => console.log('cancel')}
                    />

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
                        buttonAction="Refresh"
                    />
                </section>
                <section className="snackbars">
                    <h2>Success</h2>
                    <Snackbar
                        variant="success"
                        title="Data has been successfully exported"
                        text="We've sent you an email with the link"
                        buttonAction="Open the link"
                    />
                </section>

                <SnackbarsQueue ref="queue" />
            </div>
        )
    }
};

storiesOf('KUI', module)
    .add('snackbars', () => <StorySnackbars />);
