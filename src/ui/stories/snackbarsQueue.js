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
                text: count + ' Licence for zarcas@narod.ru wiil be deleted in:',
                button: 'Cancel',
                key: count
            });
            return {
                queue: state.queue,
                count
            };
        });
    }
    showNext() {
        this.setState(state => ({
            queue: state.queue.slice(1)
        }));
    }    
    render() {
        return !!this.state.queue.length && (
            <Snackbar
                action={this.showNext}
                {...this.state.queue[0]}
            />
        )
    }
};

export default SnackbarsQueue;