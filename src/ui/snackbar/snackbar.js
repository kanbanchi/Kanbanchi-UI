import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import { Button, Icon } from '../../ui';
import './snackbar.module.scss';

export const Snackbar = (props) => {

    let {
        className,
        variant,
        icon,
        title,
        text,
        button,
        timer,
        action,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-snackbar',
        'kui-snackbar--' + variant,
        className
    );

    let xlink = icon,
        titleDiv = '',
        textDiv = '',
        timerDiv = '',
        buttonDiv = '';

    if (icon === 'default') xlink = Snackbar.defaultIcons[variant];

    if (title) titleDiv = (
        <div className="kui-snackbar__title">
            {title}
        </div>
    );

    if (text) textDiv = (
        <div className="kui-snackbar__text">
            {text}
        </div>
    );

    if (button) buttonDiv = (
        <Button
            className="kui-snackbar__button"
            variant="primary_white"
            onClick={action}
        >
            {button}
        </Button>
    );

    if (timer) timerDiv = (
        <div className="kui-snackbar__timer">
            <span className="kui-snackbar__timer_num">{timer}</span> sec
        </div>
    );

    return (
        <div className="kui-snackbar__container">
            <div
                className={className}
                {...attributes}
            >
                <Icon xlink={xlink} size={24} className="kui-snackbar__icon" />
                <div className="kui-snackbar__body">
                    {titleDiv}
                    {textDiv}
                </div>
                {timerDiv}
                {buttonDiv}
            </div>
        </div>
    );
};

Snackbar.propTypes = {
    variant: PropTypes.oneOf([
        'warning',
        'info',
        'success'
    ]),
    icon: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    button: PropTypes.string,
    timer: PropTypes.number,
    action: PropTypes.func
};

Snackbar.defaultIcons = {
    warning: 'error',
    info: 'info',
    success: 'done'
};

Snackbar.defaultProps = {
    variant: 'info',
    icon: 'default',
    title: null,
    text: null,
    button: null,
    timer: 0,
    action: null
};

export default Snackbar;