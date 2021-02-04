import * as React from 'react';
import { IButtonsSegmentedInheritedProps } from './types';
import { ClassNames, useCombinedRefs } from '../utils';
import '../../../src/ui/buttonsSegmented/buttonsSegmented.module.scss';

// accessibility ok

export const ButtonsSegmented: React.SFC<IButtonsSegmentedInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        active,
        children,
        className,
        color,
        onChange,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-buttons_segmented',
        (color) ? 'kui-buttons_segmented--color_' + color : null,
        className
    );

    let [focusIndex, setFocusIndex] = React.useState(active);
    const _tabsRef = React.useRef(null);
    const tabsRef =  useCombinedRefs(ref, _tabsRef);

    let childrenArray: Array<{}> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    const buttonHocs = React.Children.map(childrenArray, (child: any, i) => {
        if (!child || !child.props) return null;
        return React.cloneElement(child, {
            className: ClassNames(
                'kui-buttons_segmented__item',
                (child.props.className) ? child.props.className : null,
                (i === active) ? 'kui-buttons_segmented__item--active' : null
            ),
            role: child.props.role || 'tab',
            ['aria-selected']: i === active,
            tabIndex: child.props.tabIndex || (i === active ? 0 : -1),
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
            const tab = tabsRef.current.querySelector(`.kui-buttons_segmented__item:nth-child(${focusIndex + 1})`) as HTMLElement;
            if (tab) tab.focus();
        }
    }

    React.useEffect(() => {
        setFocusIndex(active);
    }, [active]);

    return (
        <div
            className={className}
            ref={tabsRef}
            onKeyDown={onKeyDown}
            {...attributes}
        >
            {buttonHocs}
        </div>
    );
});

ButtonsSegmented.defaultProps = {
    active: 0,
    color: null,
    onChange: (): void => undefined
};

ButtonsSegmented.displayName = 'ButtonsSegmented';
