import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import styles from './buttons_segmented.module.scss';

export const ButtonsSegmented = (props) => {
    let {
        children,
        className,
        margin,
        ...attributes
    } = props;

    className = ClassNames(
        styles.buttons_segmented,
        styles['buttons_group--m_' + margin],
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

ButtonsSegmented.propTypes = {
    className: PropTypes.string,
    margin: PropTypes.oneOf([
        'small',
        'large'
    ])
};

ButtonsSegmented.defaultProps = {
    className: '',
    margin: 'small'
};

export default ButtonsSegmented;