import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import '../../../src/ui/dropdown/dropdown.module.scss';

export const Dropdown = (props) => {
    let {
        children,
        className,
        opened,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-dropdown',
        (opened) ? 'kui-dropdown--opened' : null,
        className
    );

    return (
        <div className={className} {...attributes}>
            {children}
        </div>
    );
};

Dropdown.propTypes = {
    opened: PropTypes.bool
};

Dropdown.defaultProps = {
    opened: false
};

export default Dropdown;