import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import './radio.module.scss';

export const Radio = (props) => {
    let {
        children,
        className,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-radio',
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

Radio.propTypes = {
    className: PropTypes.string
};

Radio.defaultProps = {
    className: ''
};

export default Radio;