import React from 'react';
import { Snackbar } from '../src/ui';

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
                buttons: [
                    {
                        text: 'Cancel',
                        onClick: () => console.log('cancel')
                    },
                    {
                        text: 'Ok',
                        onClick: () => console.log('ok')
                    }
                ],
                onBlur: () => console.log('onBlur')
            });
            /*
            state.queue.push({
                variant: 'error',
                timer: 5,
                text: 'The email address is not valid.',
                buttons: [
                    {
                        text: 'Ok',
                        onClick: () => console.log('ok'),
                        onTimer: true
                    }
                ]
            });
            */
            return {
                queue: state.queue,
                count
            };
        });
    }
    onButtonClick(button) {
        if (button.onClick) button.onClick();
        this.showNext();    
    }
    showNext() {
        this.setState(state => ({
            queue: state.queue.slice(1)
        }));
    }
    render() {
        if (!this.state.queue.length) return null;
        
        let { ...snackbar } = this.state.queue[0];

        if (snackbar.buttons && snackbar.buttons.length) {
            let buttonsWithNext = snackbar.buttons.map((item) => {
                let { 
                    onClick,
                    ...attributes
                } = item;
                
                attributes.onClick = () => this.onButtonClick(item);
                
                return attributes;
            });
            snackbar.buttons = buttonsWithNext;      
        }

        return (
            <Snackbar
                {...snackbar}
            />
        )
    }
};

export default SnackbarsQueue;