import * as React from 'react';
import { ISnackbarInheritedProps, ISnackbarDefaultIcons } from './types';
import { ClassNames } from '../utils';
import { Button, ButtonsGroup, Icon } from '../../ui';
import '../../../src/ui/snackbar/snackbar.module.scss';

export const Snackbar: React.SFC<ISnackbarInheritedProps> =
(props) => {

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
        buttonsGroupDiv = null;

    if (buttons) {
        buttonsGroup = buttons.map((item, key) => {
            let {
                isPrimary,
                text,
                ...attributes
            } = item;

            const buttonClassName = ClassNames(
                'kui-snackbar__button',
                (isPrimary) ? 'kui-snackbar__button--primary' : null
            );

            return (
                <Button
                    className={buttonClassName}
                    color="white"
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

    const refSnackbar = React.useRef(null);

    const [timerHook, setTimerHook] = React.useState(timer);
    const [timeoutHook, setTimeoutHook] = React.useState(null);
    const [s] = React.useState<any>({});
    const [getTimerHook] = React.useState(() => () => s.timerHook);
    s.timerHook = timerHook;

    React.useEffect(() => {
        if (attributes.onBlur) {
            refSnackbar.current.focus();
        }

        let unmounted = false;
        if (timerHook === null) return;
        setTimeoutHook(setInterval(() => {
            if (unmounted) return;
            if (getTimerHook() < 1) {
                if (onTimer) onTimer();
                clearInterval(timeoutHook);
            } else {
                setTimerHook(getTimerHook() - 1);
            }
        }, 1000));

        return () => {
            unmounted = true;
            clearInterval(timeoutHook);
        }
    }, []);

    return (
        <div className="kui-snackbar__container">
            <div
                className={className}
                ref={refSnackbar}
                tabIndex={0}
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
    onBlur: null,
    onTimer: () => undefined,
};

Snackbar.displayName = 'Snackbar';
