import * as React from 'react';
import { IDropdownInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/dropdown/dropdown.module.scss';

export const Dropdown: React.SFC<IDropdownInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        directionVertical,
        directionHorizontal,
        opened,
        portal,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-dropdown',
        (directionVertical) ? 'kui-dropdown--direction_' + directionVertical : null,
        (directionHorizontal) ? 'kui-dropdown--direction_' + directionHorizontal : null,
        (opened) ? 'kui-dropdown--opened' : null,
        (portal) ? 'kui-dropdown--portal' : null,
        className
    );

    return (
        <div
            className={className}
            {...attributes}
        >
            <div
                className="kui-dropdown__item"
                ref={ref as any}
            >
                {children}
            </div>
        </div>
    );
});

Dropdown.defaultProps = {
    directionVertical: 'auto',
    directionHorizontal: 'left',
    opened: false
};

Dropdown.displayName = 'Dropdown';
