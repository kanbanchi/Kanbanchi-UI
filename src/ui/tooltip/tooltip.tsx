import * as React from 'react';
import { ITooltipInheritedProps } from './types';
import { ClassNames, getScrollClient, getHasScroll, SCREEN_PADDING, useCombinedRefs } from '../utils';
import '../../../src/ui/tooltip/tooltip.module.scss';
import { Portal, KUI_PORTAL_ID } from './../portal/portal';
import { Icon } from '../icon/icon';
import { v4 as uuidv4 } from 'uuid';

export const Tooltip: React.FC<ITooltipInheritedProps> =
React.forwardRef((props, ref) => {
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
        isNeedCalc,
        isNoEvents,
        isNoWrap,
        isPortal,
        isScrollFit,
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
        onCalc,
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
        (isNoEvents) ? 'kui-tooltip--noevents' : null,
        (isNoWrap) ? 'kui-tooltip--nowrap' : null,
        className
    );

    let [isShown, _setIsShown] = React.useState(false); // for css animation
    let [isCanShow, _setIsCanShow] = React.useState(false);
    const [s] = React.useState<any>({});
    s.isCanShow = isCanShow;
    const [isMount, setIsMount] = React.useState(false);
    const [classHook, setClassHook] = React.useState(className);
    const [isTouchHook, setIsTouchHook] = React.useState(false);
    const [uniqueClass] = React.useState('kui-tooltip--' + uuidv4());
    let [targetsRefs] = React.useState(Array.from({ length: 10 }, () => React.useRef(null)));

    const _itemRef = React.useRef(null);
    const itemRef =  useCombinedRefs(ref, _itemRef);
    const portalRef = React.useRef(null);
    const timer = React.useRef(null);
    const timeout = React.useRef(null);
    const timerTouch = React.useRef(null);
    const timerMouse = React.useRef(null);

    const classNamePortal = isPortal ? '' : 'kui-portal--tooltip-in-target';

    if (!isPortal) {
        if (portalId === KUI_PORTAL_ID) portalId = 'kui-portal--' + uniqueClass;
        if (!portalSelector) portalSelector = '.' + uniqueClass;
    }

    const isHint = variant === 'hint';
    let html = [];
    if (arrow) {
        const icon = 'hint-arrow-' + arrow;
        html.push(<div
            className={'kui-tooltip__arrow'}
            key={'arrow'}
            style={arrowTranslate}
        >
            <Icon className={'kui-tooltip__arrow-icon'} size={16} xlink={icon} />
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
        count?: number
    ): Promise<any> => {
        const portalEl = document.getElementById(portalId) as HTMLElement;
        const item = itemRef.current;

        return new Promise((res, rej) => {
            if (!targetsRefs[index]) rej('targetsRefs');
            const target = targetsRefs[index].current || targetsRefs[index];
            if (!target || !target.getBoundingClientRect) rej('target');

            if (!portalEl || !item) {
                setIsMount(false);
                timer.current = setTimeout(() => { // tooltip didn't mount, wait
                    setIsMount(true);
                    res(calcTooltip(index));
                }, 100);
            } else {
                let itemRect = item.getBoundingClientRect();
                let itemObj: any = {
                    width: itemRect.right - itemRect.left,
                    height: itemRect.bottom - itemRect.top,
                };

                timer.current = setTimeout(() => { // long tooltip auto fits to window
                    let item = itemRef.current;
                    if (!item) rej('item');

                    let itemRect = item.getBoundingClientRect();
                    let itemWidth = itemRect.width || itemRect.right - itemRect.left;
                    if (
                        itemWidth !== itemObj.width && // fit once
                        !count
                    ) {
                        item.style.maxWidth = itemWidth + 'px';
                        res(calcTooltip(index, 1));
                    } else {
                        const w = window.innerWidth;
                        const h = window.innerHeight;

                        const targetRect = target.getBoundingClientRect();
                        const portalStyle = window.getComputedStyle(portalEl);
                        const portalRect = portalEl.getBoundingClientRect();
                        const scrollClient = isPortal && portalStyle.position !== 'fixed' ? getScrollClient() : SCROLL_CLIENT_NULL;

                        const targetObj: any = {
                            x: targetRect.left + scrollClient.scrollLeft - scrollClient.clientLeft,
                            y: targetRect.top + scrollClient.scrollTop - scrollClient.clientTop,
                            width: targetRect.right - targetRect.left,
                            height: targetRect.bottom - targetRect.top,
                        };
                        if (isPortal) {
                            targetObj.xPortal = targetRect.left - portalRect.left;
                            targetObj.yPortal = targetRect.top - portalRect.top;
                            targetObj.right = targetObj.xPortal + targetObj.width; // from left side of window to right side of target
                            targetObj.bottom = targetObj.yPortal + targetObj.height;
                            targetObj.rightPortal = portalRect.right - portalRect.left - targetObj.right; // from right side of target to right side of portal
                            targetObj.bottomPortal = portalRect.bottom - portalRect.top - targetObj.bottom;
                        } else {
                            targetObj.xPortal = 0;
                            targetObj.yPortal = 0;
                            targetObj.right = targetObj.width;
                            targetObj.bottom = targetObj.height;
                            targetObj.rightPortal = 0;
                            targetObj.bottomPortal = 0;
                        }

                        const portal = isPortal ? item : portalRef.current;
                        let padding = SCREEN_PADDING;
                        if (isScrollFit) {
                            const hasScroll = getHasScroll(item);
                            if (hasScroll.y) padding = SCREEN_PADDING * 4;
                        }

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
                            if (portalRect.left + left < padding) { // левее окна
                                left = padding - portalRect.left;
                            }
                            if (portalRect.left + left + itemWidth > w - padding) { // левее окна
                                left = w - padding - portalRect.left - itemWidth;
                            }
                            if (targetObj.x - targetObj.xPortal + left < padding) { // это когда?
                                left = padding - targetObj.x + targetObj.xPortal;
                            }
                            if (isHint && (direction === 'down' || direction === 'up')) {
                                if (isPortal) {
                                    maxWidth = (targetObj.x + targetObj.width / 2 - left) * 2;
                                    if (targetObj.x + maxWidth / 2 > w - padding) {
                                        maxWidth = (w - padding - targetObj.x - targetObj.width / 2) * 2;
                                        left = (targetObj.x - maxWidth) / 2;
                                    }
                                } else {
                                    maxWidth = targetObj.width - left * 2;
                                    if (targetObj.x + maxWidth / 2 > w - padding) {
                                        maxWidth = (w - padding - targetObj.x - targetObj.width / 2) * 2;
                                        left = (targetObj.width - maxWidth) / 2;
                                    }
                                }
                            } else {
                                maxWidth = w - portalRect.left - left - padding;
                            }
                            portal.style.left = left + 'px';
                        } else if (right !== undefined) {
                            if (translate && translate.right) {
                                right += translate.right;
                            }
                            if (isPortal && right < padding) {
                                right = padding;
                            } else if (!isPortal && w - targetObj.x - targetObj.width - right < padding) {
                                right = w - targetObj.x - targetObj.width - padding;
                            }
                            portal.style.right = right + 'px';
                            maxWidth = targetObj.x - padding;
                        }

                        item.style.maxWidth = maxWidth + 'px';
                        if (!isPortal) portal.style.maxWidth = maxWidth + 'px';
                        res();
                    }
                }, 100);
            }
        }).catch(error => console.error(error));
    };

    const setIsShown = (isShownNew: boolean) => {
        isShown = isShownNew;
        _setIsShown(isShownNew);
    };

    const setIsCanShow = (isCanShowNew: boolean) => {
        isCanShow = isCanShowNew;
        _setIsCanShow(isCanShowNew);
    };

    const toggleTooltip = (show: boolean = false) => {
        if (show && isShown) return;
        if (!show && !isShown) return;
        setIsShown(show);
        setClassHook(ClassNames(
            className,
            'kui-tooltip--' + (show ? 'show' : 'hide')
        ));
        if (timeout.current) clearTimeout(timeout.current);
        if (show) {
            if (onShow) onShow();
        } else {
            timeout.current = setTimeout(() => {
                setIsMount(false);
                setClassHook(className);
                if (onHide) onHide();
            }, WAIT_ANIMATION);
        }
    };

    const showIfCan = () => {
        if (s.isCanShow) toggleTooltip(true);
    };

    const toggleMouse = (event: React.MouseEvent, index: number, show: boolean) => {
        if (isTouchHook) return;

        if (timeout.current) clearTimeout(timeout.current);
        setIsCanShow(show);
        if (!show) {
            timeout.current = setTimeout(() => {
                toggleTooltip();
            }, WAIT_BEFORE_HIDE);
            return;
        }
        mouseMove(event, index);
    };

    const mouseMove = (event: React.MouseEvent, index: number) => {
        setIsMount(true);
        if (!timerMouse.current) {
            if (timeout.current) clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
                calcTooltip().then(showIfCan);
            }, WAIT_BEFORE_SHOW);

            if (timerMouse.current) clearTimeout(timerMouse.current);
            timerMouse.current = setTimeout(() => {
                timerMouse.current = null;
            }, MOUSE_DEBOUNCE);
        }
    };

    const toggleTouch = (event: React.TouchEvent, index: number, show: boolean) => {
        if (timerTouch.current) clearTimeout(timerTouch.current);
        if (!show) return;

        setIsTouchHook(true);
        setIsMount(true);
        timerTouch.current = setTimeout(() => {
            calcTooltip(index).then(showIfCan);
        }, WAIT_BEFORE_SHOW);
    };

    const clearShowTimers = () => {
        if (timerMouse.current) clearTimeout(timerMouse.current);
        if (timerTouch.current) clearTimeout(timerTouch.current);
        if (timeout.current) clearTimeout(timeout.current);
        timerMouse.current = null;
        timerTouch.current = null;
        timeout.current = null;
    }

    const closeTooltip = () => {
        clearShowTimers();
        if (isShown) toggleTooltip();
    }

    const onMouseEnterTooltip = () => {
        clearShowTimers();
    };

    const onMouseLeaveTooltip = () => {
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
            if (timerMouse.current) clearTimeout(timerMouse.current);
            if (timeout.current) clearTimeout(timeout.current);
            if (isShown) {
                toggleTooltip();
            } else {
                setIsMount(true);
                timeout.current = setTimeout(() => {
                    calcTooltip().then(showIfCan);
                }, WAIT_ANIMATION);
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

    const toggleShow = (show: boolean) => {
        if (!targetsRefs[0].current && !children && selector) {
            const target = targetsRefs[0].current = document.querySelector(selector);
            if (target && !isPortal) {
                target.classList.add('kui-tooltip-target');
                target.classList.add(uniqueClass);
            }
        }

        if (show === undefined) return;

        if (timeout.current) clearTimeout(timeout.current);
        if (!show) {
            timeout.current = setTimeout(() => {
                toggleTooltip();
            }, WAIT_BEFORE_HIDE);
            return;
        }
        if (!isHint) return;

        setIsCanShow(true);
        setIsMount(true);
        calcTooltip().then(showIfCan);
    };

    const childrenArray: Array<React.ReactNode> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    const targets = React.Children.map(childrenArray, (child: any, index) => {
        if (!child) return null;

        let childClassName = child.props.className;
        if (!isPortal) childClassName += ' tooltip-target ' + uniqueClass;

        const targetOnMouse = isHint ? {} : {
            onMouseEnter: (event: React.MouseEvent) => toggleMouse(event, index, true),
            onMouseLeave: (event: React.MouseEvent) => toggleMouse(event, index, false),
            onMouseMove: (event: React.MouseEvent) => mouseMove(event, index),
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
        if (!isNeedCalc) return;

        const needCalc = isNeedCalc;
        calcTooltip().then(() => {
            if (
                needCalc === isNeedCalc &&
                onCalc
            ) onCalc();
        });
    }, [isNeedCalc]);

    React.useEffect(() => {
        return () => {
            clearShowTimers();
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
});

Tooltip.defaultProps = {
    direction: 'up',
    isPortal: true,
    maxWidth: null,
    portalId: KUI_PORTAL_ID,
    state: null,
    value: null,
    variant: null,
};

Tooltip.displayName = 'Tooltip';
