import * as React from 'react';
import { IButtonsGroupInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/buttonsGroup/buttonsGroup.module.scss';

// accessibility ok

export const ButtonsGroup: React.SFC<IButtonsGroupInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        size,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-buttons_group',
        (size) ? 'kui-buttons_group--size_' + size : null,
        className
    );

    return (
        <div
            className={className}
            ref={ref as any}
            {...attributes}
        >
            {children}
        </div>
    );
});

ButtonsGroup.defaultProps = {
    size: null
}

ButtonsGroup.displayName = 'ButtonsGroup';
