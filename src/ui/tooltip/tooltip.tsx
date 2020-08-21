import * as React from 'react';
import { ITooltipInheritedProps } from './types';
import { ClassNames, getScrollClient, getHasScroll, SCREEN_PADDING } from '../utils';
import '../../../src/ui/tooltip/tooltip.module.scss';
import { Portal } from './../portal/portal';
import { Icon } from '../icon/icon';
import { v4 as uuidv4 } from 'uuid';

export const Tooltip: React.SFC<ITooltipInheritedProps> =
(props) => {
    let {
        children,
        className,
        arrow,
        arrowTranslate,
        delay,
        delayClose,
        direction,
        footer,
        isHidable,
        isPortal,
        header,
        link,
        maxWidth,
        portalId,
        portalSelector,
        selector,
        show,
        state,
        translate,
        value,
        variant,
        onShow,
        onHide,
    } = props;

    if (isHidable === undefined) isHidable = true;
    const WAIT_BEFORE_SHOW = delay || 300;
    const WAIT_ANIMATION = 200;
    const WAIT_BEFORE_HIDE = delayClose || 100;
    const MOUSE_DEBOUNCE = 200;
    const SCROLL_CLIENT_NULL = {
        scrollLeft: 0,
        scrollTop: 0,
        clientLeft: 0,
        clientTop: 0
    };

    className = ClassNames(
        'kui-tooltip',
        'kui-tooltip--direction_' + direction,
        (maxWidth) ? 'kui-tooltip--maxwidth_' + maxWidth : null,
        (state) ? 'kui-tooltip--state_' + state : null,
        (!value) ? 'kui-tooltip--empty' : null,
        (link) ? 'kui-tooltip--link' : null,
        (footer) ? 'kui-tooltip--footer' : null,
        (arrow) ? 'kui-tooltip--arrow-' + arrow : null,
        (arrowTranslate) ? 'kui-tooltip--arrowTranslate' : null,
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
    const [uniqueClass, setUniqueClass] = React.useState('kui-tooltip--' + uuidv4());
    const portalRef = React.useRef(null);
    const timer = React.useRef(null);

    const classNamePortal = isPortal ? '' : 'kui-portal--tooltip-in-target';

    if (!isPortal) {
        if (!portalId) portalId = 'kui-portal--' + uniqueClass;
        if (!portalSelector) portalSelector = '.' + uniqueClass;
    }

    const isHint = variant === 'hint';
    let html = [];
    if (arrow) {
        // const icon = 'hint-arrow-' + arrow; //TODO no such icon in the new set
        html.push(<div
            className={'kui-tooltip__arrow'}
            key={'arrow'}
            style={arrowTranslate}
        >
            {/*<Icon className={'kui-tooltip__arrow-icon'} size={16} xlink={icon} />*/}
        </div>);
    }
    if (header) {
        html.push(<div
            className={'kui-tooltip__header'}
            key={'header'}
            dangerouslySetInnerHTML={{ __html: header }}
        />);
    }
    html.push(<div
        className={'kui-tooltip__text'}
        key={'text'}
        dangerouslySetInnerHTML={{ __html: value }} />
    );
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
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (!targetObj) {
            if (!targetsRefs[index]) return;
            const target = targetsRefs[index].current || targetsRefs[index];
            if (!target || !target.getBoundingClientRect) return;
            const targetRect = target.getBoundingClientRect();
            const scrollClient = isPortal ? getScrollClient() : SCROLL_CLIENT_NULL;

            targetObj = {
                x: targetRect.left + scrollClient.scrollLeft - scrollClient.clientLeft,
                y: targetRect.top + scrollClient.scrollTop - scrollClient.clientTop,
                width: targetRect.right - targetRect.left,
                height: targetRect.bottom - targetRect.top,
            };
            if (isPortal) {
                targetObj.xPortal = targetObj.x;
                targetObj.yPortal = targetObj.y;
                targetObj.right = targetObj.xPortal + targetObj.width; // from left side of window to right side of target
                targetObj.bottom = targetObj.yPortal + targetObj.height;
                targetObj.rightPortal = w - targetObj.right; // from right side of target to right side of window
                targetObj.bottomPortal = h - targetObj.bottom;
            } else {
                targetObj.xPortal = 0;
                targetObj.yPortal = 0;
                targetObj.right = targetObj.width;
                targetObj.bottom = targetObj.height;
                targetObj.rightPortal = 0;
                targetObj.bottomPortal = 0;
            }
        }

        const item = itemRef.current;
        if (!item) {
            timer.current = setTimeout(() => { // tooltip didn't mount, wait
                calcTooltip(index, targetObj);
            }, WAIT_ANIMATION);
            return;
        };
        let itemRect = item.getBoundingClientRect();
        let itemObj: any = {
            width: itemRect.width || itemRect.right - itemRect.left,
            height: itemRect.height || itemRect.bottom - itemRect.top
        };

        timer.current = setTimeout(() => { // long tooltip auto fit to window
            let item = itemRef.current;
            if (item) {
                let itemRect = item.getBoundingClientRect();
                let itemWidth = itemRect.width || itemRect.right - itemRect.left;
                if (itemWidth !== itemObj.width) {
                    if (!count) {
                        item.style.maxWidth = itemWidth + 'px';
                        calcTooltip(index, targetObj, 1);
                    }
                }
            }
        }, 100);

        const portal = isPortal ? item : portalRef.current;
        const hasScroll = getHasScroll(item);
        const SCREEN_PADDING_WITH_SCROLLBAR = hasScroll.y ? SCREEN_PADDING * 4 : SCREEN_PADDING;

        let top, bottom;
        if (direction.includes('down')) {
            top = targetObj.bottom;

        } else if (direction.includes('up')) {
            bottom = targetObj.bottomPortal + targetObj.height;

        } else if (direction === 'left' || direction === 'right') {
            top = targetObj.yPortal + (targetObj.height - itemObj.height) / 2;
        }

        if (top !== undefined) {
            if (translate && translate.top) {
                top += translate.top;
            }
            portal.style.top = top + 'px';
        } else if (bottom !== undefined) {
            if (translate && translate.bottom) {
                bottom += translate.bottom;
            }
            portal.style.bottom = bottom + 'px';
        }

        let left, right;
        if (direction === 'down' || direction === 'up') {
            left = targetObj.xPortal + (targetObj.width - itemObj.width) / 2;

        } else if (direction.includes('-left')) {
            right = targetObj.rightPortal;

        } else if (direction.includes('-right')) {
            left = targetObj.xPortal;

        } else if (direction === 'left') {
            right = targetObj.rightPortal + targetObj.width;

        } else if (direction === 'right') {
            left = targetObj.right;

        }

        let maxWidth = 0;
        if (left !== undefined) {
            if (translate && translate.left) {
                left += translate.left;
            }
            if (targetObj.x - targetObj.xPortal + left < SCREEN_PADDING) {
                left = SCREEN_PADDING - targetObj.x + targetObj.xPortal;
            }
            if (isHint && (direction === 'down' || direction === 'up')) {
                if (isPortal) {
                    maxWidth = (targetObj.x + targetObj.width / 2 - left) * 2;
                    if (targetObj.x + maxWidth / 2 > w - SCREEN_PADDING) {
                        maxWidth = (w - SCREEN_PADDING_WITH_SCROLLBAR - targetObj.x - targetObj.width / 2) * 2;
                        left = (targetObj.x - maxWidth) / 2;
                    }
                } else {
                    maxWidth = targetObj.width - left * 2;
                    if (targetObj.x + maxWidth / 2 > w - SCREEN_PADDING) {
                        maxWidth = (w - SCREEN_PADDING_WITH_SCROLLBAR - targetObj.x - targetObj.width / 2) * 2;
                        left = (targetObj.width - maxWidth) / 2;
                    }
                }
            } else {
                maxWidth = w - targetObj.x + targetObj.xPortal - left - SCREEN_PADDING_WITH_SCROLLBAR;
            }
            portal.style.left = left + 'px';
        } else if (right !== undefined) {
            if (translate && translate.right) {
                right += translate.right;
            }
            if (isPortal && right < SCREEN_PADDING) {
                right = SCREEN_PADDING;
            } else if (!isPortal && w - targetObj.x - targetObj.width - right < SCREEN_PADDING) {
                right = w - targetObj.x - targetObj.width - SCREEN_PADDING;
            }
            portal.style.right = right + 'px';
            maxWidth = targetObj.x + targetObj.width - right - SCREEN_PADDING_WITH_SCROLLBAR;
        }

        item.style.maxWidth = maxWidth + 'px';
        if (!isPortal) portal.style.maxWidth = maxWidth + 'px';
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
            timeoutHook = setTimeout(() => {
                timeoutHook = null;
                setTimeoutHook(timeoutHook);
            }, WAIT_ANIMATION);
        } else {
            timeoutHook = setTimeout(() => {
                if (timeoutHook) {
                    setIsMount(false);
                    setClassHook(className);
                    isMouseOverTooltip = false;
                    setMouseOverTooltip(false);
                    timeoutHook = null;
                    setTimeoutHook(timeoutHook);
                }
                if (onHide) onHide();
            }, WAIT_ANIMATION);
        }
        setTimeoutHook(timeoutHook);
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
        if (isHidable) {
            onMouseLeaveTooltip();
        }
    };

    const onClickTarget = () => {
        if (link) { // toggle tooltip by click target
            if (!timeoutHook) {
                if (mouseHook) clearTimeout(mouseHook);
                mouseHook = null;
                if (isShown) {
                    toggleTooltip();
                } else {
                    setIsMount(true);
                    calcTooltip();
                    clearTimeout(timeoutHook);
                    const timeout = window.setTimeout(() => {
                        if (timeoutHook === timeout) {
                            toggleTooltip(true);
                        }
                    }, WAIT_ANIMATION);
                    timeoutHook = timeout;
                    setTimeoutHook(timeoutHook);
                }
            }
        } else if (isHidable) {
            closeTooltip();
        }
    };

    const clickLink = () => {
        const footer = itemRef.current.querySelector('.kui-tooltip__footer');
        if (!footer) return;

        const a = footer.querySelector('a');
        if (!a) return;

        if (a.click) a.click();
    };

    const toggleShow = (show: boolean = false) => {
        if (!targetsRefs[0].current && !children && selector) {
            const target = targetsRefs[0].current = document.querySelector(selector);
            if (target && !isPortal) {
                target.classList.add('kui-tooltip-target');
                target.classList.add(uniqueClass);
            }
        }

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
        if (!isHint) return;

        setIsMount(true);
        calcTooltip();
        clearTimeout(timeoutHook);
        const timeout = window.setTimeout(() => {
            if (timeoutHook === timeout) {
                toggleTooltip(show);
            }
        }, WAIT_BEFORE_SHOW);
        timeoutHook = timeout;
        setTimeoutHook(timeoutHook);
    };

    const childrenArray: Array<React.ReactNode> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    const targetsRefs = Array.from({ length: 10 }, () => React.useRef(null));
    const itemRef = React.useRef(null);

    const targets = React.Children.map(childrenArray, (child: any, index) => {
        if (!child) return null;

        let childClassName = child.props.className;
        if (!isPortal) childClassName += ' tooltip-target ' + uniqueClass;

        const targetOnMouse = isHint ? {} : {
            onMouseEnter: (event: React.MouseEvent) => toggleMouse(event, index, true),
            onMouseLeave: (event: React.MouseEvent) => toggleMouse(event, index, false),
            onMouseMove: (event: React.MouseEvent) => mouseMove(event),
        };

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
            className: childClassName,
            title: null,
            tooltip: null,
            onBlur: (event: React.FocusEvent) => {
                if (isHidable) {
                    closeTooltip();
                }
                if (child.props.onBlur) child.props.onBlur(event);
            },
            onClick: (event: React.MouseEvent) => {
                onClickTarget();
                if (child.props.onClick) child.props.onClick(event);
            },
            onTouchStart: (event: React.TouchEvent) => toggleTouch(event, index, true),
            onTouchEnd: (event: React.TouchEvent) => toggleTouch(event, index, false),
            ...targetOnMouse
        });
    });

    React.useEffect(() => {
        if (!value) {
            setClassHook(className);
        }
    }, [value]);

    React.useEffect(() => {
        toggleShow(show);
    }, [show]);

    React.useEffect(() => {
        return () => {
            clearTimeout(mouseHook);
            clearTimeout(touchHook);
            clearTimeout(timeoutHook);
            if (timer.current) clearTimeout(timer.current);
        }
    }, []);

    const tooltipOnMouse = isHint ? {} : {
        onMouseEnter: onMouseEnterTooltip,
        onMouseLeave: onMouseLeaveTooltip
    };

    return (
        <>
            {targets}
            {isMount &&
                <Portal
                    className={!isPortal && !isShown ? 'kui-portal--tooltip-hidden' : ''}
                    id={portalId}
                    selector={portalSelector}
                >
                    <div
                        className={classNamePortal}
                        ref={portalRef}
                    >
                        <div
                            className={classHook}
                            ref={itemRef}
                            onClick={onClickTooltip}
                            {...tooltipOnMouse}
                        >
                            {html}
                        </div>
                    </div>
                </Portal>
            }
        </>
    );
};

Tooltip.defaultProps = {
    direction: 'up',
    isPortal: true,
    maxWidth: null,
    state: null,
    value: null,
    variant: null,
};

Tooltip.displayName = 'Tooltip';
