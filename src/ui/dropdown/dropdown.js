import React, { forwardRef } from 'react';
import { PropTypes, ClassNames } from '../utils';
import '../../../src/ui/dropdown/dropdown.module.scss';

export const Dropdown = forwardRef((props, ref) => {
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
        <div
            className={className}
            ref={ref}
            {...attributes}
        >
            {children}
        </div>
    );
});

Dropdown.propTypes = {
    opened: PropTypes.bool
};

Dropdown.defaultProps = {
    opened: false
};

export default Dropdown;