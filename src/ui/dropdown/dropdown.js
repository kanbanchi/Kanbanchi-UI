import React, { forwardRef } from 'react';
import { PropTypes, ClassNames } from '../utils';
import '../../../src/ui/dropdown/dropdown.module.scss';

export const Dropdown = forwardRef((props, ref) => {
    let {
        children,
        className,
        direction,
        opened,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-dropdown',
        (direction) ? 'kui-dropdown--direction_' + direction : null,
        (opened) ? 'kui-dropdown--opened' : null,
        className
    );

    return (
        <div
            className={className}
            ref={ref}
            {...attributes}
        >
            <div className="kui-dropdown__item">
                {children}
            </div>
        </div>
    );
});

Dropdown.propTypes = {
    direction: PropTypes.string, 
    opened: PropTypes.bool
};

Dropdown.defaultProps = {
    direction: null,
    opened: false
};

export default Dropdown;