import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import styles from './snackbar.module.scss';
import { Button, Icon } from '../../ui';

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
        styles['kui-snackbar'],
        styles['kui-snackbar--' + variant],
        className
    );

    let xlink = icon,
        titleDiv = '',
        textDiv = '',
        timerDiv = '',
        buttonDiv = '';

    if (icon === 'default') xlink = Snackbar.defaultIcons[variant];

    if (title) titleDiv = (
        <div className={styles['kui-snackbar__title']}>
            {title}
        </div>
    );

    if (text) textDiv = (
        <div className={styles['kui-snackbar__text']}>
            {text}
        </div>
    );

    if (button) buttonDiv = (
        <Button
            className={styles['kui-snackbar__button']}
            variant="primary_white"
            onClick={action}
        >
            {button}
        </Button>
    );

    if (timer) timerDiv = (
        <div className={styles['kui-snackbar__timer']}>
            <span className={styles['kui-snackbar__timer_num']}>{timer}</span> sec
        </div>
    );

    return (
        <div className={styles['kui-snackbar__container']}>
            <div
                className={className}
                {...attributes}
            >
                <Icon xlink={xlink} size={24} className={styles['kui-snackbar__icon']} />
                <div className={styles['kui-snackbar__body']}>
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
    className: PropTypes.string,
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
    className: '',
    variant: 'info',
    icon: 'default',
    title: null,
    text: null,
    button: null,
    timer: 0,
    action: null
};

export default Snackbar;