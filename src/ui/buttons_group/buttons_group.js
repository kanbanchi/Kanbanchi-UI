import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import styles from './buttons_group.module.scss';

const ButtonsGroup = (props) => {
    let {
        children,
        className,
        margin,
        ...attributes
    } = props;

    className = ClassNames(
        styles.buttons_group,
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