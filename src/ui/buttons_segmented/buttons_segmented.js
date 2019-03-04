import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import styles from './buttons_segmented.module.scss';

export const ButtonsSegmented = (props) => {
    let {
        active,
        action,
        children,
        className,
        ...attributes
    } = props,
        buttonHocs,
        buttonClassName;

    className = ClassNames(
        styles['kui-buttons_segmented'],
        className
    );

    if (children.length) {
        if (active > children.length - 1) active = 0;

        buttonHocs = React.Children.map(children, (child, i) => {
            return React.cloneElement(child, {
                className: ClassNames(
                    styles['kui-buttons_segmented__item'],
                    (i === active) ? styles['kui-buttons_segmented__item--active'] : ''
                ),
                onClick: () => {
                    action(i);
                    if (child.props.onClick) child.props.onClick();
                }
            });
        });       
    }

    return (
        <div
            className={className}
            {...attributes}
        >
            {buttonHocs}
        </div>
    );
};

ButtonsSegmented.propTypes = {
    active: PropTypes.number,
    action: PropTypes.func
};

ButtonsSegmented.defaultProps = {
    active: 0,
    action: null
};

export default ButtonsSegmented;