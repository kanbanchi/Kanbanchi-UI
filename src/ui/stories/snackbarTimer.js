import React from 'react';
import { PropTypes } from '../utils';
import { Snackbar } from '../../ui';

class SnackbarTimer extends React.Component {
    constructor(props) {
        super();
        this.hidePopup = this.hidePopup.bind(this);
        this.state = {
            isShown: props.isShown,
            timer: props.timer
        };
    }    
    hidePopup() {
        if (this.props.action) this.props.action();
        clearInterval(this.interval);
        this.setState(() => ({
            isShown: false
        }));
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            let timer = this.state.timer - 1;
            if (timer <= 0) {
                this.hidePopup();
            } else {
                this.setState(() => ({
                    timer
                }));
            }
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        let {
            isShown,
            timer,
            action,
            ...attributes
        } = this.props;
                
        return this.state.isShown && (
            <Snackbar
                timer={this.state.timer}
                action={this.hidePopup}
                {...attributes}
            />
        )
    }
};

SnackbarTimer.propTypes = {
    isShown: PropTypes.bool,
    timer: PropTypes.number,
    action: PropTypes.func
};

SnackbarTimer.defaultProps = {
    isShown: false,
    timer: 5,
    action: null
};

export default SnackbarTimer;