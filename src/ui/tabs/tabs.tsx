import * as React from 'react';
import { ITabsInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/tabs/tabs.module.scss';

export const Tabs: React.SFC<ITabsInheritedProps> =
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

    const activeRef = React.useRef(null);

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
            onClick: (e) => {
                if (onChange) onChange(i);
                if (child.props.onClick) child.props.onClick(e);
            }
        });
    });

    React.useEffect(() => {
        if (activeRef.current) activeRef.current.scrollIntoView({inline: 'center', behavior: 'smooth'});
    }, [active]);

    return (
        <div
            className={className}
            ref={ref as any}
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
