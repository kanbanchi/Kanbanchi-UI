import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import '../../../src/ui/switch/switch.module.scss';

export const Switch = (props) => {
    let {
        children,
        className,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-switch',
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

Switch.propTypes = {
    className: PropTypes.string
};

Switch.defaultProps = {
    className: ''
};

export default Switch;