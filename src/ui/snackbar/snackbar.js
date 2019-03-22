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
        buttonAction,
        buttonCancel,
        timer,
        onAction,
        onCancel,
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

    const onActionHide = () => {
        if (onAction) onAction();
        hide();
    };

    const onCancelHide = () => {
        if (onCancel) onCancel();
        hide();
    };

    const hide = () => {
        setTimerHook(null);
        setIsShownHook(false);
    };

    if (timer !== null) {
        let timeOut;
        useEffect(() => {
            if (timerHook === null) {
                clearTimeout(timeOut);
                return;
            }
            if (timerHook < 1) {
                onActionHide();
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

    let buttonsGroup = null;
    if (buttonAction || buttonCancel) {
        buttonsGroup = (
            <ButtonsGroup className="kui-snackbar__buttons">
                {buttonCancel &&
                    <Button
                        className="kui-snackbar__button"
                        variant="primary_white"
                        onClick={onCancelHide}
                    >
                        {buttonCancel}
                    </Button>
                }
                {buttonAction &&
                    <Button
                        className="kui-snackbar__button"
                        variant="primary_white"
                        onClick={onActionHide}
                    >
                        {buttonAction}
                    </Button>
                }
            </ButtonsGroup>
        );
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
                {buttonsGroup}
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
    buttonAction: PropTypes.string,
    buttonCancel: PropTypes.string,
    timer: PropTypes.number,
    onAction: PropTypes.func,
    onCancel: PropTypes.func
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
    buttonAction: null,
    buttonCancel: null,
    timer: null,
    onAction: null,
    onCancel: null
};

export default Snackbar;