import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import './button.module.scss';
import { Icon } from '../../ui';

export const Button = (props) => {
    let {
        children,
        className,
        size,
        variant,
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
            disabled = 'disabled';
        }
    }

    className = ClassNames(
        'kui-button',
        'kui-button--' + variant,
        'kui-button--' + size,
        'kui-button--' + disabled,
        className
    );

    if (Button.variantWithIcon.includes(variant)) {
        let iconProps = {
            className: 'kui-button__icon',
            size: 16
        };
        switch (variant) {
            case 'action':
                iconProps.xlink = 'more-vertical';
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
            {iconAfter}
        </Tag>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf([
        'primary',
        'primary_white',
        'secondary',
        'fab',
        'action',
        'text',
        'icon'
    ]),
    size: PropTypes.oneOf([
        'large',
        'small'
    ]),
    type: PropTypes.oneOf([
        'button',
        'submit'
    ]),
    href: PropTypes.string,
    disabled: PropTypes.bool
};

Button.variantWithIcon = [
    'action',
    'text'
];

Button.defaultProps = {
    className: '',
    variant: 'primary',
    size: 'small',
    type: 'button',
    href: null,
    disabled: false,
};

export default Button;