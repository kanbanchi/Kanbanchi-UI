import * as React from 'react';
import { ITooltipInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/tooltip/tooltip.module.scss';

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

    className = ClassNames(
        'kui-tooltip',
        'kui-tooltip--direction_' + direction,
        (maxWidth) ? 'kui-tooltip--maxwidth_' + maxWidth : null,
        (state) ? 'kui-tooltip--state_' + state : null,
        className
    );

    const [isShown, setIsShown] = React.useState(false);
    const [classHook, setClassHook] = React.useState(className);
    const [timeoutHook, setTimeoutHook] = React.useState(null);
    const [touchHook, setTouchHook] = React.useState(null);
    const [s] = React.useState<any>({});
    const [getTimeoutHook] = React.useState(() => () => s.timeoutHook);
    s.timeoutHook = timeoutHook;
    const [getTouchHook] = React.useState(() => () => s.touchHook);
    s.touchHook = touchHook;
    const [isTouchHook, setIsTouchHook] = React.useState(false);

    const calcTooltip = (index: number = 0) => {
        let target = targetsRefs[index].current;
        let targetRect = target.getBoundingClientRect();
        let targetObj: any = {
            x: target.offsetLeft,
            y: target.offsetTop,
            width: targetRect.width || targetRect.right - targetRect.left,
            height: targetRect.height || targetRect.bottom - targetRect.top,
        };
        targetObj.right = target.offsetLeft + targetObj.width;
        targetObj.bottom = target.offsetTop + targetObj.height;

        let item = itemRef.current;
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
        setIsShown(show);
        setClassHook(ClassNames(
            className,
            'kui-tooltip--' + (show ? 'show' : 'hide')
        ));
    };

    const toggleMouse = (index: number, show: boolean) => {
        if (isTouchHook) return;
        if (!show) {
            clearTimeout(timeoutHook);
            setTimeoutHook(null);
            toggleTooltip();
            return;
        }
        calcTooltip(index);
        setTimeoutHook(setTimeout(() => {
            if (getTimeoutHook()) {
                toggleTooltip(show);
            }
        }, 300));
    };

    const toggleTouch = (index: number, show: boolean) => {
        if (!show) {
            clearTimeout(touchHook);
            setTouchHook(null);
            return;
        }
        setIsTouchHook(true);
        calcTooltip(index);
        setTouchHook(setTimeout(() => {
            if (getTouchHook()) {
                toggleTooltip(show);
            }
        }, 300));
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

    const targetsRefs = Array.from({ length: childrenArray.length }, () => React.useRef(null));
    const itemRef = React.useRef(null);

    const targets = React.Children.map(childrenArray, (child: any, index) => {
        return React.cloneElement(child, {
            ref: targetsRefs[index],
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
            onMouseEnter: () => toggleMouse(index, true),
            onMouseLeave: () => toggleMouse(index, false),
            onTouchStart: () => toggleTouch(index, true),
            onTouchEnd: () => toggleTouch(index, false)
        });
    });

    return (
        <>
            {targets}
            <div
                className={classHook}
                ref={itemRef}
                onClick={closeTooltip}
            >
                {value}
            </div>
        </>
    );
};

Tooltip.defaultProps = {
    direction: 'down',
    maxWidth: null,
    state: null,
    value: null
};

Tooltip.displayName = 'Tooltip';
