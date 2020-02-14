import * as React from 'react';
import { IHintInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/hint/hint.module.scss';
import { Tooltip } from '../tooltip/tooltip';

export function Hint (props: IHintInheritedProps) {
    let {
        children,
        className,
        arrow,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-hint',
        className
    );

    return (
        <Tooltip
            className={className}
            {...attributes}
        >
            {children}
        </Tooltip>
    );
};

Hint.defaultProps = {
    arrow: 'down'
};

Hint.displayName = 'Hint';
