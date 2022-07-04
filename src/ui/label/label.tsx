import * as React from 'react';
import { ILabelInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/label/label.module.scss';

// accessibility ok

export const Label: React.FC<ILabelInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        className,
        children,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-label',
        className
    );

    return (
        <label
            className={className}
            ref={ref as any}
            {...attributes}
        >
            {children}
        </label>
    );
});

Label.displayName = 'Label';
