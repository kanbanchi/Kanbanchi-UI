import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Snackbar } from '../../ui';
import SnackbarTimer from './snackbarTimer';
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

                    <h2>Warnings</h2>
                    <Snackbar
                        variant="warning"
                        text="The email address is not valid. Please, use name@domain.com format."
                    />
                    <Snackbar
                        variant="warning"
                        text="The maximum number of seats is exceeded. Click Manage subscription to buy more seats."
                        button="Close"
                    />
                    <SnackbarTimer
                        isShown={true}
                        timer={5}
                        variant="warning"
                        text="Licence for zarcas@narod.ru wiil be deleted in:"
                        button="Cancel"
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
