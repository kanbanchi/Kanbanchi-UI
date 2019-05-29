import * as React from 'react';
import { IDropdownProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/dropdown/dropdown.module.scss';

export const Dropdown: React.SFC<
    IDropdownProps
    & React.HTMLAttributes<HTMLElement>
> = React.forwardRef((props, ref) => {
    let {
        children,
        className,
        directionVertical,
        directionHorizontal,
        opened,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-dropdown',
        (directionVertical) ? 'kui-dropdown--direction_' + directionVertical : null,
        (directionHorizontal) ? 'kui-dropdown--direction_' + directionHorizontal : null,
        (opened) ? 'kui-dropdown--opened' : null,
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
