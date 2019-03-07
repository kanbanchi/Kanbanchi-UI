import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import './datepicker.module.scss';

export const Datepicker = (props) => {
    let {
        children,
        className,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-datepicker',
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

Datepicker.propTypes = {
    className: PropTypes.string
};

Datepicker.defaultProps = {
    className: ''
};

export default Datepicker;