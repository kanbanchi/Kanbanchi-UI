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
        (margin) ? 'kui-buttons_group--m_' + margin : null,
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
    margin: PropTypes.oneOf([
        'large'
    ])
};

ButtonsGroup.defaultProps = {
    margin: null
};

export default ButtonsGroup;