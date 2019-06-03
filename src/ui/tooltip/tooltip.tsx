import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ITooltipProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/tooltip/tooltip.module.scss';

export const Tooltip: React.SFC<
    ITooltipProps
    & React.HTMLAttributes<HTMLElement>
> = (props) => {
    let {
        children,
        className,
        direction,
        value
    } = props;

    className = ClassNames(
        'kui-tooltip',
        'kui-tooltip--direction_' + direction,
        className
    );

    const [classHook, setClassHook] = React.useState(className);

    const toggleTooltip = (index: number, show: boolean) => {
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

        setClassHook(ClassNames(
            className,
            'kui-tooltip--' + (show ? 'show' : 'hide')
        ));
    };

    const childrenArray: Array<React.ReactNode> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    const targetsRefs = Array.from({ length: childrenArray.length }, () => React.useRef(null));
    const itemRef = React.useRef(null);

    const targets = React.Children.map(childrenArray, (child: any, index) => {
        return React.cloneElement(child, {
            ref: targetsRefs[index],
            title: null,
            onMouseEnter: () => toggleTooltip(index, true),
            onMouseLeave: () => toggleTooltip(index, false),
        });
    });

    return (
        <>
            {targets}
            <div
                className={classHook}
                ref={itemRef}
            >
                {value}
            </div>
        </>
    );
};

Tooltip.defaultProps = {
    direction: 'down',
    value: null
};

Tooltip.displayName = 'Tooltip';
