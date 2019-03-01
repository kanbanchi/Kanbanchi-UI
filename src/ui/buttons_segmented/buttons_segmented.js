import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import styles from './buttons_segmented.module.scss';

const ButtonsSegmented = (props) => {
    let {
        active,
        buttons,
        className,
        ...attributes
    } = props;

    className = ClassNames(
        styles.buttons_segmented,
        className
    );

    if (buttons.length) {
        if (active > buttons.length - 1) active = 0;
        buttons[active].className = ClassNames(
            styles['buttons_segmented__button--active'],
            className
        );
        let activeclassName =  || '';
        
    }

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
    buttons: PropTypes.array,
    active: PropTypes.number
};

ButtonsSegmented.defaultProps = {
    buttons: [],
    active: 0
};

export default ButtonsSegmented;