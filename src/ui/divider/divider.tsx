import * as React from 'react';
import { IDividerInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/divider/divider.module.scss';

// accessibility ok

export const Divider: React.FC<IDividerInheritedProps> =
(props) => {
    let {
        className,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-divider',
        className
    );

    return (
        <hr className={className} {...attributes} />
    );
};

Divider.defaultProps = {};

Divider.displayName = 'Divider';
