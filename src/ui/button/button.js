import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import '../../../src/ui/button/button.module.scss';
import { Icon } from '../../ui';

export const Button = (props) => {
    let {
        children,
        className,
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
        iconAfter
    } = {};

    const Tag = (href) ? 'a' : 'button';
    if (href) {
        delete attributes.type;
        if (disabled) {
            delete attributes.href;
        }
    }

    className = ClassNames(
        'kui-button',
        'kui-button--' + variant,
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
            {children}
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
        'primary_white',
        'secondary',
        'fab',
        'action',
        'text',
        'icon',
        'icon-text',
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
    size: null,
    type: 'button',
    href: null,
    disabled: false,
    text: null
};

export default Button;