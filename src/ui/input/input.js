import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import './input.module.scss';

export const Input = (props) => {
    let {
        children,
        className,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-input',
        className
    );

    return (
        <div
            className={className}
            {...attributes}
        >
            {children}
        </div>
    );
};

Input.propTypes = {
    className: PropTypes.string
};

Input.defaultProps = {
    className: ''
};

export default Input;