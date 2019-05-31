import * as React from 'react';
import { IDividerProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/divider/divider.module.scss';

export const Divider: React.SFC<
    IDividerProps
    & React.HTMLAttributes<HTMLElement>
> = (props) => {
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
