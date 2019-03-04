import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import styles from './buttons_segmented.module.scss';

const ButtonsSegmented = (props) => {
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
        styles.buttons_segmented,
        className
    );

    if (children.length) {
        if (active > children.length - 1) active = 0;

        buttonHocs = React.Children.map(children, (child, i) => {
            return React.cloneElement(child, {
                className: ClassNames(
                    styles.buttons_segmented__item,
                    (i === active) ? styles['buttons_segmented__item--active'] : ''
                ),
                onClick: () => {
                    action(i);
                    if (child.props.onClick) child.props.onClick();
                }
            });
        });
/*    
        for (let i = 0; i < children.length; i++) {
            buttonClassName = ClassNames(
                styles.buttons_segmented__item,
                (i === active) ? styles['buttons_segmented__item--active'] : ''
            );
            buttonHocs.push(
                <div
                    key={i}
                    onClick={() => action(i)}
                    className={buttonClassName}
                >
                    {children[i]}
                </div>
            );
        }
*/        
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