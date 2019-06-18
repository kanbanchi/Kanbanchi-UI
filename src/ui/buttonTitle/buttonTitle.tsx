import * as React from 'react';
import { IButtonTitleInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/buttonTitle/buttonTitle.module.scss';

export const ButtonTitle: React.SFC<IButtonTitleInheritedProps> =
(props) => {
    let {
        children,
        className,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-button__text',
        className
    );

    return (
        <span
            className={className}
            {...attributes}
        >
            {children}
        </span>
    );
}

ButtonTitle.defaultProps = {
}

ButtonTitle.displayName = 'ButtonTitle';
