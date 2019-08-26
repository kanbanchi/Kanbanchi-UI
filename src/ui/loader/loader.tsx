import * as React from 'react';
import { ILoaderInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/loader/loader.module.scss';

export const Loader: React.SFC<ILoaderInheritedProps> =
(props) => {
    let {
        className,
        color,
        size,
        ...attributes
    } = props;

    const classNames = ClassNames(
        'kui-loader',
        (color) ? 'kui-loader--color_' + color : null,
        (size) ? 'kui-loader--size_' + size : null,
        className
    );

    return (
        <span className={classNames} {...attributes} >
            <span className="kui-loader__item kui-loader__item--01"></span>
            <span className="kui-loader__item kui-loader__item--02"></span>
            <span className="kui-loader__item kui-loader__item--03"></span>
            <span className="kui-loader__item kui-loader__item--04"></span>
            <span className="kui-loader__item kui-loader__item--05"></span>
        </span>
    );
};

Loader.defaultProps = {
    color: 'purple',
    size: null
};

Loader.displayName = 'Loader';
