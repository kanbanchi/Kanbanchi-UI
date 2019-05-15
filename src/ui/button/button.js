import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import '../../../src/ui/button/button.module.scss';
import { Icon } from '../../ui';

export const Button = (props) => {
    let {
        children,
        className,
        color,
        size,
        variant,
        text,
        ...attributes
    } = props;

    let {
        disabled,
        href
    } = attributes;

    let {
        iconBefore,
        iconAfter,
        childrenDiv
    } = {};

    const Tag = (href) ? 'a' : 'button';
    if (href) {
        delete attributes.type;
        if (disabled) {
            delete attributes.href;
        }
    }

    if (variant === 'fab') {
        childrenDiv = (<div className="kui-button__children">{children}</div>);
    } else {
        childrenDiv = children;
    }

    className = ClassNames(
        'kui-button',
        'kui-button--' + variant,
        (color) ? 'kui-button--' + color: null,
        (size) ? 'kui-button--' + size : null,
        (disabled) ? 'kui-button--disabled' : null,
        className
    );

    if (Button.variantWithIcon.includes(variant)) {
        let iconProps = {
            className: 'kui-button__icon',
            size: 16
        };
        switch (variant) {
            case 'action':
                iconProps.xlink = 'dots';
                iconBefore = <Icon {...iconProps} />;
                break;
            case 'text':
                iconProps.xlink = 'arrow-long-right';
                iconAfter = <Icon {...iconProps} />;
                break;
        }
    }

    return (
        <Tag
            className={className}
            {...attributes}
        >
            {iconBefore}
            {childrenDiv}
            {text &&
                <span className="kui-button__text">
                    {text}
                </span>
            }
            {iconAfter}
        </Tag>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf([
        'primary',
        'secondary',
        'fab',
        'action',
        'text',
        'icon',
        'icon-text',
    ]),
    color: PropTypes.oneOf([
        'black',
        'purple',
        'white'
    ]),
    size: PropTypes.oneOf([
        'large'
    ]),
    type: PropTypes.oneOf([
        'button',
        'submit'
    ]),
    href: PropTypes.string,
    disabled: PropTypes.bool,
    text: PropTypes.string
};

Button.variantWithIcon = [
    'action',
    'text'
];

Button.defaultProps = {
    variant: 'primary',
    color: null,
    size: null,
    type: 'button',
    href: null,
    disabled: false,
    text: null
};

export default Button;