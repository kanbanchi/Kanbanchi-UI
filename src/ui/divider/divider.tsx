import * as React from 'react';
import { ClassNames } from '../utils';
import '../../../src/ui/divider/divider.module.scss';

export const Divider: React.SFC<React.HTMLAttributes<HTMLElement>>
= (props) => {
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
