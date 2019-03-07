import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import './checkbox.module.scss';

export const Checkbox = (props) => {
    let {
        children,
        className,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-checkbox',
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

Checkbox.propTypes = {
    className: PropTypes.string
};

Checkbox.defaultProps = {
    className: ''
};

export default Checkbox;