import React from 'react';
import { ClassNames } from '../utils';
import '../../../src/ui/label/label.module.scss';

export const Label = (props) => {
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
            {...attributes}
        >
            {children}
        </label>
    );
};

export default Label;