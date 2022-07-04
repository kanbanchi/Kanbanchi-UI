import * as React from 'react';
import { ITabsInheritedProps } from './types';
import { ClassNames, useCombinedRefs } from '../utils';
import '../../../src/ui/tabs/tabs.module.scss';

// accessibility ok

export const Tabs: React.FC<ITabsInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        active,
        children,
        className,
        size,
        onChange,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-tabs',
        (size) ? 'kui-tabs--size_' + size : null,
        className
    );

    let [focusIndex, setFocusIndex] = React.useState(active);
    const activeRef = React.useRef(null);
    const _tabsRef = React.useRef(null);
    const tabsRef =  useCombinedRefs(ref, _tabsRef);

    let childrenArray: Array<{}> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    const buttonHocs = React.Children.map(childrenArray, (child: any, i) => {
        if (!child) return null;
        return React.cloneElement(child, {
            className: ClassNames(
                'kui-tabs__item',
                (child.props.className) ? child.props.className : null,
                (i === active) ? 'kui-tabs__item--active' : null
            ),
            ref: i === active ? activeRef : null,
            role: child.props.role || 'tab',
            ['aria-selected']: i === active,
            tabIndex: child.props.tabIndex || (i === active ? 0 : -1),
            ['aria-setsize']: childrenArray.length,
            ['aria-posinset']: i + 1,
            onClick: (e) => {
                if (onChange) onChange(i);
                if (child.props.onClick) child.props.onClick(e);
            }
        });
    });

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!e) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            if (e.key === 'ArrowRight') {
                focusIndex++;
                if (focusIndex >= buttonHocs.length) {
                    focusIndex = 0;
                }
            } else if (e.key === 'ArrowLeft') {
                focusIndex--;
                if (focusIndex < 0) {
                    focusIndex = buttonHocs.length - 1;
                }
            }
            const tab = tabsRef.current.querySelector(`.kui-tabs__item:nth-child(${focusIndex + 1})`) as HTMLElement;
            if (tab) tab.focus();
        }
    }

    React.useEffect(() => {
        if (activeRef.current) activeRef.current.scrollIntoView({inline: 'center', behavior: 'smooth'});
        setFocusIndex(active);
    }, [active]);

    return (
        <div
            className={className}
            ref={tabsRef}
            role={'tablist'}
            onKeyDown={onKeyDown}
            {...attributes}
        >
            <div className="kui-tabs__scroll">
                {buttonHocs}
            </div>
        </div>
    );
});

Tabs.defaultProps = {
    active: 0,
    size: null,
    onChange: (): void => undefined
};

Tabs.displayName = 'Tabs';
