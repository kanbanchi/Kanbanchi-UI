import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import '../../../src/ui/buttons_segmented/buttons_segmented.module.scss';

export const ButtonsSegmented = (props) => {
    let {
        active,
        action,
        children,
        className,
        variant,
        ...attributes
    } = props,
        buttonHocs;

    className = ClassNames(
        'kui-buttons_segmented',
        (variant) ? 'kui-buttons_segmented--' + variant : null,
        className
    );

    if (children.length) {
        if (active > children.length - 1) active = 0;

        buttonHocs = React.Children.map(children, (child, i) => {
            return React.cloneElement(child, {
                className: ClassNames(
                    'kui-buttons_segmented__item',
                    (i === active) ? 'kui-buttons_segmented__item--active' : ''
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
    action: PropTypes.func,
    variant: PropTypes.oneOf([
        'black'
    ])
};

ButtonsSegmented.defaultProps = {
    active: 0,
    action: null,
    variant: null
};

export default ButtonsSegmented;