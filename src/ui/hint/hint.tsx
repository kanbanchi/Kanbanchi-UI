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
        show,
        variant,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-hint',
        className
    );

    return (
        <Tooltip
            className={className}
            arrow={arrow}
            show={show}
            variant={variant}
            {...attributes}
        >
            {children}
        </Tooltip>
    );
};

Hint.defaultProps = {
    arrow: 'down',
    show: true,
    variant: 'hint'
};

Hint.displayName = 'Hint';
