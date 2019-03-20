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
                        text="The maximum number of seats is exceeded. Click Manage subscription to buy more seats."
                        button="Close"
                    />

                    <h2>Timer</h2>
                    <Snackbar
                        variant="timer"
                        text="Licence for zarcas@narod.ru wiil be deleted in:"
                        button="Cancel"
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
                        button="Refresh"
                    />
                </section>
                <section className="snackbars">
                    <h2>Success</h2>
                    <Snackbar
                        variant="success"
                        title="Data has been successfully exported"
                        text="We've sent you an email with the link"
                        button="Open the link"
                    />
                </section>

                <SnackbarsQueue ref="queue" />
            </div>
        )
    }
};

storiesOf('KUI', module)
    .add('snackbars', () => <StorySnackbars />);
