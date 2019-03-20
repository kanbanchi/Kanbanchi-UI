import React, { useState, useEffect } from 'react';
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
        (!title) ? 'kui-snackbar--notitle' : null,
        className
    );

    let xlink = (icon === 'default') ? Snackbar.defaultIcons[variant] : icon;

    if (variant === 'timer' && timer === null) timer = 10;
    
    const [timerHook, setTimerHook] = useState(timer);
    const [isShownHook, setIsShownHook] = useState(true);

    const hide = () => {
        if (action) action();
        setTimerHook(0);
        setIsShownHook(false);
    };

    if (timer !== null) {
        let timeOut;
        useEffect(() => {
            if (timerHook < 1) {
                hide();
            } else {
                timeOut = setTimeout(() => {
                    setTimerHook(timerHook - 1);
                }, 1000);
            }
            return () => {
                clearTimeout(timeOut);
            }
        });
    }

    return isShownHook && (
        <div className="kui-snackbar__container">
            <div
                className={className}
                {...attributes}
            >
                <Icon xlink={xlink} size={24} className="kui-snackbar__icon" />
                <div className="kui-snackbar__body">
                    {title &&
                        <div className="kui-snackbar__title">
                            {title}
                        </div>
                    }
                    {text &&
                        <div className="kui-snackbar__text">
                            {text}
                        </div>
                    }
                </div>
                {variant === 'timer' &&
                    <div className="kui-snackbar__timer">
                        <span className="kui-snackbar__timer_num">{timerHook}</span> sec
                    </div>
                }
                {button &&
                    <Button
                        className="kui-snackbar__button"
                        variant="primary_white"
                        onClick={hide}
                    >
                        {button}
                    </Button>
                }
            </div>
        </div>
    );
};

Snackbar.propTypes = {
    variant: PropTypes.oneOf([
        'info',
        'error',
        'success',
        'timer'
    ]),
    icon: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    button: PropTypes.string,
    timer: PropTypes.number,
    action: PropTypes.func
};

Snackbar.defaultIcons = {
    info: 'info',
    error: 'error',
    success: 'done',
    timer: 'error'
};

Snackbar.defaultProps = {
    variant: 'info',
    icon: 'default',
    title: null,
    text: null,
    button: null,
    timer: null,
    action: null
};

export default Snackbar;