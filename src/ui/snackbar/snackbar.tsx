import * as React from 'react';
import { ISnackbarInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Button, Icon } from '../../ui';
import '../../../src/ui/snackbar/snackbar.module.scss';
import { TButtonVariant } from '../button/types';

// accessibility ok

export const Snackbar: React.FC<ISnackbarInheritedProps> =
(props) => {

    let {
        className,
        buttons,
        text,
        textIcon,
        timer,
        title,
        titleIcon,
        onTimer,
        ...attributes
    } = props;

    const refSnackbar = React.useRef(null);

    const [timerHook, setTimerHook] = React.useState(timer);
    const [timeoutHook, setTimeoutHook] = React.useState(null);
    const [isHovered, setHovered] = React.useState(null);
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

    className = ClassNames(
        'kui-snackbar',
        !title ? 'kui-snackbar--notitle' : null,
        !isHovered && timerHook !== null && timerHook < 3 ? 'kui-snackbar--fadeout' : null,
        !isHovered && timerHook !== null && timerHook <= 0 ? 'hidden' : null,
        className
    );

    const  classContainer = ClassNames(
        'kui-snackbar__container',
    )

    let buttonsGroup = [],
        buttonsGroupDiv = null;

    if (buttons) {
        buttonsGroup = buttons.map((item, key) => {
            let {
                isPrimary,
                isTimer,
                text,
                icon,
                ...attributes
            } = item;

            const buttonClassName = ClassNames(
                'kui-snackbar__button',
                isPrimary ? 'kui-snackbar__button--primary' : null,
                isTimer ? 'kui-snackbar__button--timer' : null
            );

            const variant: TButtonVariant = icon ? 'icon' : 'primary';
            const children = icon
                ? <Icon
                    size={16}
                    xlink={icon}
                />
                : text
            return (
                <Button
                    className={buttonClassName}
                    color={!icon ? 'white' : null}
                    key={key}
                    variant={variant}
                    progress={isTimer && timer ? 100 - timerHook / timer * 100 : null}
                    {...attributes}
                >
                    {children}
                </Button>
            );
        });
        buttonsGroupDiv = (
            <div className="kui-snackbar__buttons">
                {buttonsGroup}
            </div>
        );
    }

    return (
        <div className={classContainer}>
            <div
                className={className}
                ref={refSnackbar}
                tabIndex={0}
                aria-live={timer === timerHook ? 'assertive' : 'off'} // при смене таймера скрин ридеру нужен только таймер
                role={'alert'}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                {...attributes}
            >
                <div className="kui-snackbar__body">
                    {title &&
                        <div className="kui-snackbar__title">
                            {titleIcon && <Icon xlink={titleIcon} size={24} className="kui-snackbar__icon" />}
                            <div className="kui-snackbar__title-text" dangerouslySetInnerHTML={{ __html: title }}></div>
                        </div>
                    }
                    {text &&
                        <div className="kui-snackbar__text">
                            {textIcon && <Icon xlink={textIcon} size={24} className="kui-snackbar__icon" />}
                            <div className="kui-snackbar__text-text" dangerouslySetInnerHTML={{ __html: text }}></div>
                        </div>
                    }
                </div>
                {buttonsGroupDiv}
            </div>
        </div>
    );
};

Snackbar.defaultProps = {
    buttons: null,
    text: null,
    textIcon: null,
    timer: null,
    title: null,
    titleIcon: null,
    onBlur: null,
    onTimer: () => undefined,
};

Snackbar.displayName = 'Snackbar';
