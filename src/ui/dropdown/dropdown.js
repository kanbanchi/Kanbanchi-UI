import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import '../../../src/ui/dropdown/dropdown.module.scss';

export const Dropdown = (props) => {
    let {
        children,
        className,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-dropdown',
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

Dropdown.propTypes = {
    className: PropTypes.string
};

Dropdown.defaultProps = {
    className: ''
};

export default Dropdown;