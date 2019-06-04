import * as React from 'react';
import { ILabelProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/label/label.module.scss';

export const Label: React.SFC<
    ILabelProps
    & React.LabelHTMLAttributes<HTMLElement>
> = React.forwardRef((props, ref) => {
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
