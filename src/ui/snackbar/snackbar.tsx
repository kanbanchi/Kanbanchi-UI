import * as React from 'react';
import { ISnackbarProps, ISnackbarButtonProps, ISnackbarDefaultIcons } from './types';
import { ClassNames } from '../utils';
import { Button, ButtonsGroup, Icon } from '../../ui';
import '../../../src/ui/snackbar/snackbar.module.scss';

export const Snackbar: React.SFC<
    ISnackbarProps
    & React.HTMLAttributes<HTMLElement>
> = (props) => {

    let {
        className,
        buttons,
        icon,
        text,
        timer,
        title,
        variant,
        onTimer,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-snackbar',
        'kui-snackbar--variant_' + variant,
        (!title) ? 'kui-snackbar--notitle' : null,
        className
    );

    let xlink = (icon === null) ? ISnackbarDefaultIcons[variant] : icon;

    if (variant === 'timer' && timer === null) timer = 10;

    let buttonsGroup = [],
        buttonsGroupDiv = null,
        onTimerDefault = onTimer;

    if (buttons) {
        buttonsGroup = buttons.map((item, key) => {
            let {
                text,
                onClick,
                onTimer,
                ...attributes
            } = item;

            if (onTimer) onTimerDefault = onClick;

            return (
                <Button
                    className="kui-snackbar__button"
                    color="white"
                    key={key}
                    onClick={()=>onButtonClick(item)}
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

    const onButtonClick = (button: ISnackbarButtonProps) => {
        if (button.onClick) button.onClick();
        hideSnackbar();
    };

    const onTimerAction = () => {
        if (onTimerDefault) onTimerDefault();
        hideSnackbar();
    };

    const hideSnackbar = () => {
        setTimerHook(null);
        setIsShownHook(false);
    };

    const [timerHook, setTimerHook] = React.useState(timer);
    const [timeoutHook, setTimeoutHook] = React.useState(null);
    const [isShownHook, setIsShownHook] = React.useState(true);

    React.useEffect(() => {
        if (timerHook === null) {
            clearTimeout(timeoutHook);
            return;
        }
        if (timerHook < 1) {
            onTimerAction();
        } else {
            setTimeoutHook(setTimeout(() => {
                setTimerHook(timerHook - 1);
            }, 1000));
        }
        return () => {
            clearTimeout(timeoutHook);
        }
    }, [timerHook]);

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

Snackbar.defaultProps = {
    buttons: null,
    icon: null,
    text: null,
    timer: null,
    title: null,
    variant: 'info',
    onTimer: () => undefined,
};

Snackbar.displayName = 'Snackbar';
