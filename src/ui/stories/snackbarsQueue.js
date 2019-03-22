import React from 'react';
import { Snackbar } from '../../ui';

class SnackbarsQueue extends React.Component {
    constructor() {
        super();
        this.showNext = this.showNext.bind(this);
        this.state = {
            queue: [],
            count: 0
        };
    }
    AddSnackbar() {
        this.setState(state => {
            const count = ++state.count;
            state.queue.push({
                variant: 'timer',
                timer: 5,
                text: 'Removing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                buttonAction: 'Ok',
                buttonCancel: 'Cancel',
                onAction: () => console.log('action1'),
                onCancel: () => console.log('cancel1')
            });
            return {
                queue: state.queue,
                count
            };
        });
    }
    onActionNext(actions) {
        if (actions.onAction) actions.onAction();
        this.showNext();    
    }
    onCancelNext(actions) {
        if (actions.onCancel) actions.onCancel();
        this.showNext();    
    }
    showNext() {
        this.setState(state => ({
            queue: state.queue.slice(1)
        }));
    }
    render() {
        return !!this.state.queue.length && (
            <Snackbar
                {...this.state.queue[0]}
                onAction={() => this.onActionNext(this.state.queue[0])}
                onCancel={() => this.onCancelNext(this.state.queue[0])}
            />
        )
    }
};

export default SnackbarsQueue;