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
        delay,
        direction,
        footer,
        link,
        maxWidth,
        state,
        value,
        delayClose,
        onShow,
    } = props;

    const WAIT_BEFORE_SHOW = delay || 300;
    const WAIT_ANIMATION = 200;
    const WAIT_BEFORE_HIDE = delayClose || 100;
    const MOUSE_DEBOUNCE = 200;

    className = ClassNames(
        'kui-tooltip',
        'kui-tooltip--direction_' + direction,
        (maxWidth) ? 'kui-tooltip--maxwidth_' + maxWidth : null,
        (state) ? 'kui-tooltip--state_' + state : null,
        (!value) ? 'kui-tooltip--empty' : null,
        (link) ? 'kui-tooltip--link' : null,
        className
    );

    const [isShown, setIsShown] = React.useState(false); // for css animation
    const [isMount, setIsMount] = React.useState(false);
    const [classHook, setClassHook] = React.useState(className);
    const [isTouchHook, setIsTouchHook] = React.useState(false);
    let [timeoutHook, setTimeoutHook] = React.useState(null);
    let [touchHook, setTouchHook] = React.useState(null);
    let [mouseHook, setMouseHook] = React.useState(null);
    let [isMouseOverTooltip, setMouseOverTooltip] = React.useState(false);

    let html = [<div
        className={'kui-tooltip__text'}
        key={'text'}
        dangerouslySetInnerHTML={{ __html: value }} />
    ];
    if (footer || link) {
        html.push(<div
            className={'kui-tooltip__footer'}
            key={'footer'}
        >{footer || link}</div>);
    }

    const calcTooltip = (
        index: number = 0,
        targetObj?: any,
        count?: number
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

        setTimeout(() => { // long tooltip auto fit to window
            let item = itemRef.current;
            if (item) {
                let itemRect = item.getBoundingClientRect();
                let itemWidth = itemRect.width || itemRect.right - itemRect.left;
                if (itemWidth !== itemObj.width) {
                    if (!count) {
                        item.style.width = itemWidth + 'px';
                        calcTooltip(index, targetObj, 1);
                    }
                }
            }
        }, 100);

        let top;
        if (direction.includes('down')) {
            top = targetObj.bottom;

        } else if (direction.includes('up')) {
            top = targetObj.y - itemObj.height;

        } else if (direction === 'left' || direction === 'right') {
            top = targetObj.y + targetObj.height / 2;
        }
        if (top !== undefined) item.style.top = top + 'px';

        let left;
        if (direction === 'down' || direction === 'up') {
            left = targetObj.x + targetObj.width / 2;

        } else if (direction.includes('-left')) {
            left = targetObj.right - itemObj.width;

        } else if (direction.includes('-right')) {
            left = targetObj.x;

        } else if (direction === 'left') {
            left = targetObj.x - itemObj.width;

        } else if (direction === 'right') {
            left = targetObj.right;

        }
        let right;
        if (left !== undefined) {
            if (direction === 'down' || direction === 'up') {
                if (left < itemObj.width / 2) { // fix if translateX(-50%) goes out window
                    left = itemObj.width / 2;
                } else if (left + itemObj.width / 2 > window.innerWidth) {
                    left = undefined;
                    right = -itemObj.width / 2;
                }
            } else {
                if (left < 0) {
                    left = 8;
                    item.style.width = (targetObj.x - left) + 'px';
                } else if (left + itemObj.width > window.innerWidth) {
                    item.style.width = (window.innerWidth - left) + 'px';
                }
            }
        }
        if (left !== undefined) {
            item.style.left = left + 'px';
        } else if (right !== undefined) {
            item.style.left = 'unset';
            item.style.right = right + 'px';
        }
    };

    const toggleTooltip = (show: boolean = false) => {
        if (show && isShown) return;
        if (!show && !isShown) return;
        if (isMouseOverTooltip) return;
        setIsShown(show);
        setClassHook(ClassNames(
            className,
            'kui-tooltip--' + (show ? 'show' : 'hide')
        ));
        if (show) {
            if (onShow) onShow();
        } else {
            timeoutHook = setTimeout(() => {
                if (timeoutHook) {
                    setIsMount(false);
                    setClassHook(className);
                    isMouseOverTooltip = false;
                    setMouseOverTooltip(false);
                }
            }, WAIT_ANIMATION);
            setTimeoutHook(timeoutHook);
        }
    };

    const toggleMouse = (event: React.MouseEvent, index: number, show: boolean) => {
        event.persist();
        if (isTouchHook) return;
        if (!show) {
            clearTimeout(timeoutHook);
            const timeout = window.setTimeout(() => {
                if (timeoutHook === timeout) {
                    timeoutHook = null;
                    setTimeoutHook(timeoutHook);
                    toggleTooltip();
                }
            }, WAIT_BEFORE_HIDE);
            timeoutHook = timeout;
            setTimeoutHook(timeoutHook);
            return;
        }
        setIsMount(true);
        calcTooltip(index);

        clearTimeout(timeoutHook);
        const timeout = window.setTimeout(() => {
            if (timeoutHook === timeout) {
                toggleTooltip(show);
            }
        }, WAIT_BEFORE_SHOW);
        timeoutHook = timeout;
        setTimeoutHook(timeoutHook);

        clearTimeout(mouseHook);
        const mouseTimeout = window.setTimeout(() => {
            mouseHook = null;
            setMouseHook(mouseHook);
        }, MOUSE_DEBOUNCE);
        mouseHook = mouseTimeout;
        setMouseHook(mouseHook);
    };

    const mouseMove = (event: React.MouseEvent) => {
        if (isShown) return;
        if (!mouseHook) {
            clearTimeout(timeoutHook);
            const timeout = window.setTimeout(() => {
                if (timeoutHook === timeout) {
                    toggleTooltip(true);
                }
            }, WAIT_BEFORE_SHOW);
            timeoutHook = timeout;
            setTimeoutHook(timeoutHook);

            clearTimeout(mouseHook);
            const mouseTimeout = window.setTimeout(() => {
                mouseHook = null;
                setMouseHook(mouseHook);
            }, MOUSE_DEBOUNCE);
            mouseHook = mouseTimeout;
            setMouseHook(mouseHook);
        }
    };

    const toggleTouch = (event: React.TouchEvent, index: number, show: boolean) => {
        if (!show) {
            clearTimeout(touchHook);
            touchHook = null
            setTouchHook(touchHook);
            return;
        }
        setIsTouchHook(true);
        setIsMount(true);
        calcTooltip(index);
        touchHook = setTimeout(() => {
            if (touchHook) {
                toggleTooltip(show);
            }
        }, WAIT_BEFORE_SHOW);
        setTouchHook(touchHook);
    };

    const closeTooltip = () => {
        clearTimeout(mouseHook);
        clearTimeout(touchHook);
        clearTimeout(timeoutHook);
        touchHook = null;
        timeoutHook = null;
        setTouchHook(null);
        setTimeoutHook(null);
        if (isShown) toggleTooltip();
    }

    const onMouseEnterTooltip = () => {
        isMouseOverTooltip = true;
        setMouseOverTooltip(true);
        clearTimeout(mouseHook);
        clearTimeout(touchHook);
        clearTimeout(timeoutHook);
        touchHook = null;
        timeoutHook = null;
        setTouchHook(null);
        setTimeoutHook(null);
    };

    const onMouseLeaveTooltip = () => {
        isMouseOverTooltip = false;
        setMouseOverTooltip(false);
        closeTooltip();
    };

    const onClickTooltip = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.tagName.toLocaleLowerCase() !== 'a') {
            clickLink();
        }
        onMouseLeaveTooltip();
    };

    const onClickTarget = () => {
        if (
            isShown &&
            link &&
            !isTouchHook
        ) clickLink();
        closeTooltip();
    };

    const clickLink = () => {
        const footer = itemRef.current.querySelector('.kui-tooltip__footer');
        if (!footer) return;

        const a = footer.querySelector('a');
        if (!a) return;

        if (a.click) a.click();
    };

    const childrenArray: Array<React.ReactNode> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    const targetsRefs = Array.from({ length: 10 }, () => React.useRef(null));
    const itemRef = React.useRef(null);

    const targets = React.Children.map(childrenArray, (child: any, index) => {
        if (!child) return null;
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
                onClickTarget();
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

    React.useEffect(() => {
        return () => {
            clearTimeout(mouseHook);
            clearTimeout(touchHook);
            clearTimeout(timeoutHook);
        }
    }, []);

    return (
        <>
            {targets}
            {isMount &&
                <Portal>
                    <div
                        className={classHook}
                        ref={itemRef}
                        onClick={onClickTooltip}
                        onMouseEnter={onMouseEnterTooltip}
                        onMouseLeave={onMouseLeaveTooltip}
                    >
                        {html}
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
