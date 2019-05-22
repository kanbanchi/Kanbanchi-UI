import React from 'react';
import {PropTypes, ClassNames} from '../utils';
import '../../../src/ui/loader/loader.module.scss';

export const Loader = (props) => {
    let {
        className,
        small,
        ...attributes
    } = props;

    const classNames = ClassNames(
        'kui-loader',
        (small) ? 'kui-loader--small' : null,
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

Loader.propTypes = {
    small: PropTypes.bool
};

Loader.defaultProps = {
    small: false
};

export default Loader;