import * as React from 'react';
import { ITooltipInheritedProps } from './types';
import { ClassNames, getScrollClient } from '../utils';
import '../../../src/ui/tooltip/tooltip.module.scss';
import { Portal } from './../portal/portal';

export const Tooltip: React.SFC<ITooltipInheritedProps> =
(props) => {
    let {
        children,
        className,
        direction,
        maxWidth,
        state,
        value
    } = props;

    const WAIT_BEFORE_SHOW = 300;
    const WAIT_ANIMATION = 200;
    const WAIT_BEFORE_HIDE = 100;
    const MOUSE_DEBOUNCE = 200;

    className = ClassNames(
        'kui-tooltip',
        'kui-tooltip--direction_' + direction,
        (maxWidth) ? 'kui-tooltip--maxwidth_' + maxWidth : null,
        (state) ? 'kui-tooltip--state_' + state : null,
        (!value) ? 'kui-tooltip--empty' : null,
        className
    );

    const [isShown, setIsShown] = React.useState(false); // for css animation
    const [isMount, setIsMount] = React.useState(false);
    const [classHook, setClassHook] = React.useState(className);
    const [isTouchHook, setIsTouchHook] = React.useState(false);
    const [s] = React.useState<any>({});
    const [timeoutHook, setTimeoutHook] = React.useState(null);
    const [getTimeoutHook] = React.useState(() => () => s.timeoutHook);
    s.timeoutHook = timeoutHook;
    const [touchHook, setTouchHook] = React.useState(null);
    const [getTouchHook] = React.useState(() => () => s.touchHook);
    s.touchHook = touchHook;
    const [mouseHook, setMouseHook] = React.useState(null);
    const [getMouseHook] = React.useState(() => () => s.mouseHook);
    s.mouseHook = mouseHook;

    const calcTooltip = (
        index: number = 0,
        targetObj?: any
    ) => {
        if (!targetObj) {
            if (!targetsRefs[index]) return;
            let target = targetsRefs[index].current || targetsRefs[index];
            let targetRect = target.getBoundingClientRect();
            const scrollClient = getScrollClient();

            targetObj = {
                x: targetRect.left + scrollClient.scrollLeft - scrollClient.clientLeft,
                y: targetRect.top + scrollClient.scrollTop - scrollClient.clientTop,
                width: targetRect.width || targetRect.right - targetRect.left,
                height: targetRect.height || targetRect.bottom - targetRect.top,
            };
            targetObj.right = targetObj.x + targetObj.width;
            targetObj.bottom = targetObj.y + targetObj.height;
        }

        let item = itemRef.current;
        if (!item) {
            return setTimeout(() => { // tooltip didn't mount, wait
                calcTooltip(index, targetObj);
            }, WAIT_ANIMATION);
        };
        let itemRect = item.getBoundingClientRect();
        let itemObj: any = {
            width: itemRect.width || itemRect.right - itemRect.left,
            height: itemRect.height || itemRect.bottom - itemRect.top
        };

        if (direction.includes('down')) {
            item.style.top = targetObj.bottom + 'px';

        } else if (direction.includes('up')) {
            item.style.top = targetObj.y - itemObj.height + 'px';

        } else if (direction === 'left' || direction === 'right') {
            item.style.top = targetObj.y + targetObj.height / 2 + 'px';
        }

        if (direction === ('down') || direction === ('up')) {
            item.style.left = targetObj.x + targetObj.width / 2 + 'px';

        } else if (direction.includes('-left')) {
            item.style.left = targetObj.right - itemObj.width + 'px';

        } else if (direction.includes('-right')) {
            item.style.left = targetObj.x + 'px';

        } else if (direction === 'left') {
            item.style.left = targetObj.x - itemObj.width + 'px';

        } else if (direction === 'right') {
            item.style.left = targetObj.right + 'px';

        }
    };

    const toggleTooltip = (show: boolean = false) => {
        if (show && isShown) return;
        if (!show && !isShown) return;
        setIsShown(show);
        setClassHook(ClassNames(
            className,
            'kui-tooltip--' + (show ? 'show' : 'hide')
        ));
        if (!show) {
            setTimeoutHook(setTimeout(() => {
                if (getTimeoutHook()) {
                    setIsMount(false);
                    setClassHook(className);
                }
            }, WAIT_ANIMATION));
        }
    };

    const toggleMouse = (event: React.MouseEvent, index: number, show: boolean) => {
        event.persist();
        if (isTouchHook) return;
        if (!show) {
            clearTimeout(timeoutHook);
            const timeout = window.setTimeout(() => {
                if (getTimeoutHook() === timeout) {
                    setTimeoutHook(null);
                    toggleTooltip();
                }
            }, WAIT_BEFORE_HIDE);
            setTimeoutHook(timeout);
            return;
        }
        setIsMount(true);
        calcTooltip(index);

        clearTimeout(timeoutHook);
        const timeout = window.setTimeout(() => {
            if (getTimeoutHook() === timeout) {
                toggleTooltip(show);
            }
        }, WAIT_BEFORE_SHOW);
        setTimeoutHook(timeout);

        clearTimeout(mouseHook);
        const mouseTimeout = window.setTimeout(() => {
            setMouseHook(null);
        }, MOUSE_DEBOUNCE);
        setMouseHook(mouseTimeout);
    };

    const mouseMove = (event: React.MouseEvent) => {
        if (isShown) return;
        if (!getMouseHook()) {
            clearTimeout(timeoutHook);
            const timeout = window.setTimeout(() => {
                if (getTimeoutHook() === timeout) {
                    toggleTooltip(true);
                }
            }, WAIT_BEFORE_SHOW);
            setTimeoutHook(timeout);

            clearTimeout(mouseHook);
            const mouseTimeout = window.setTimeout(() => {
                setMouseHook(null);
            }, MOUSE_DEBOUNCE);
            setMouseHook(mouseTimeout);
        }
    };

    const toggleTouch = (event: React.TouchEvent, index: number, show: boolean) => {
        if (!show) {
            clearTimeout(touchHook);
            setTouchHook(null);
            return;
        }
        setIsTouchHook(true);
        setIsMount(true);
        calcTooltip(index);
        setTouchHook(setTimeout(() => {
            if (getTouchHook()) {
                toggleTooltip(show);
            }
        }, WAIT_BEFORE_SHOW));
    };

    const closeTooltip = () => {
        setTouchHook(null);
        setTimeoutHook(null);
        clearTimeout(touchHook);
        clearTimeout(timeoutHook);
        if (isShown) toggleTooltip();
    }

    const childrenArray: Array<React.ReactNode> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    const targetsRefs = Array.from({ length: 10 }, () => React.useRef(null));
    const itemRef = React.useRef(null);

    const targets = React.Children.map(childrenArray, (child: any, index) => {
        return React.cloneElement(child, {
            ref: (node: any) => {
                targetsRefs[index] = node;
                const {ref} = child;
                if (typeof ref === 'function') {
                    ref(node);
                } else if (ref !== null) {
                    ref.current = node;
                }
            },
            title: null,
            tooltip: null,
            onBlur: (e) => {
                closeTooltip();
                if (child.props.onBlur) child.props.onBlur(e);
            },
            onClick: (e) => {
                closeTooltip();
                if (child.props.onClick) child.props.onClick(e);
            },
            onMouseEnter: (event: React.MouseEvent) => toggleMouse(event, index, true),
            onMouseLeave: (event: React.MouseEvent) => toggleMouse(event, index, false),
            onMouseMove: (event: React.MouseEvent) => mouseMove(event),
            onTouchStart: (event: React.TouchEvent) => toggleTouch(event, index, true),
            onTouchEnd: (event: React.TouchEvent) => toggleTouch(event, index, false)
        });
    });

    React.useEffect(() => {
        setClassHook(className);
    }, [value]);

    return (
        <>
            {targets}
            {isMount &&
                <Portal>
                    <div
                        className={classHook}
                        ref={itemRef}
                        onClick={closeTooltip}
                    >
                        {value}
                    </div>
                </Portal>
            }
        </>
    );
};

Tooltip.defaultProps = {
    direction: 'up',
    maxWidth: null,
    state: null,
    value: null
};

Tooltip.displayName = 'Tooltip';
