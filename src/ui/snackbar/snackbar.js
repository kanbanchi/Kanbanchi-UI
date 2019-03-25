import React, { useState, useEffect } from 'react';
import { PropTypes, ClassNames } from '../utils';
import { Button, ButtonsGroup, Icon } from '../../ui';
import '../../../src/ui/snackbar/snackbar.module.scss';

export const Snackbar = (props) => {

    let {
        className,
        variant,
        icon,
        title,
        text,
        timer,
        buttons,
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

    let buttonsGroup = [],
        buttonsGroupDiv = null,
        onTimerDefault = null;

    if (buttons) {
        buttonsGroup = buttons.map((item, key) => {
            let {
                text,
                onClick,
                onTimer,
                ...attributes
            } = item;
            
            attributes.onClick = () => onButtonClick(item);
            if (onTimer) onTimerDefault = attributes.onClick;
            
            return (
                <Button
                    className="kui-snackbar__button"
                    variant="primary_white"
                    key={key}
                    {...attributes}
                >
                    {text}
                </Button>
            );
        });
        buttonsGroupDiv = (
            <ButtonsGroup className="kui-snackbar__buttons">
                {buttonsGroup}
            </ButtonsGroup>
        );
    }

    const onButtonClick = (button) => {
        if (button.onClick) button.onClick();
        hide();
    };

    const onTimer = () => {
        if (onTimerDefault) onTimerDefault();
        hide();
    };

    const hide = () => {
        setTimerHook(null);
        setIsShownHook(false);
    };

    const [timerHook, setTimerHook] = useState(timer);
    const [isShownHook, setIsShownHook] = useState(true);

    if (timer !== null) {
        let timeOut;
        useEffect(() => {
            if (timerHook === null) {
                clearTimeout(timeOut);
                return;
            }
            if (timerHook < 1) {
                onTimer();
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
                        <div className="kui-snackbar__title" dangerouslySetInnerHTML={{ __html: title }}></div>
                    }
                    {text &&
                        <div className="kui-snackbar__text" dangerouslySetInnerHTML={{ __html: text }}></div>
                    }
                </div>
                {variant === 'timer' &&
                    <div className="kui-snackbar__timer">
                        <span className="kui-snackbar__timer_num">{timerHook}</span> sec
                    </div>
                }
                {buttonsGroupDiv}
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
    timer: PropTypes.number,
    buttons: PropTypes.array
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
    timer: null,
    buttons: null
};

export default Snackbar;