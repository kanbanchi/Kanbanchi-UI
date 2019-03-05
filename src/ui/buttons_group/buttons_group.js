import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import './buttons_group.module.scss';

export const ButtonsGroup = (props) => {
    let {
        children,
        className,
        margin,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-buttons_group',
        'kui-buttons_group--m_' + margin,
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

ButtonsGroup.propTypes = {
    className: PropTypes.string,
    margin: PropTypes.oneOf([
        'small',
        'large'
    ])
};

ButtonsGroup.defaultProps = {
    className: '',
    margin: 'small'
};

export default ButtonsGroup;