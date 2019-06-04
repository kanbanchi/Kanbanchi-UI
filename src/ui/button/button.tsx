import * as React from 'react';
import { IButtonInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Icon } from '../../ui';
import '../../../src/ui/button/button.module.scss';

export const Button: React.SFC<IButtonInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        color,
        size,
        variant,
        text,
        ...attributes
    } = props,
        iconBefore = null,
        iconAfter = null,
        childrenDiv = null;

    let {
        disabled,
        href
    } = attributes;

    const Tag: any = (href) ? 'a' : 'button';

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
        'kui-button--variant_' + variant,
        (color) ? 'kui-button--color_' + color: null,
        (size) ? 'kui-button--size_' + size : null,
        (disabled) ? 'kui-button--disabled' : null,
        className
    );

    const iconProps: any = {
        className: 'kui-button__icon'
    };
    switch (variant) {
        case 'add':
            iconProps.xlink = 'plus';
            iconProps.size = 24;
            iconAfter = <Icon {...iconProps} />;
            break;
        case 'action':
            iconProps.xlink = 'dots';
            iconBefore = <Icon {...iconProps} />;
            break;
        case 'text':
            iconProps.xlink = 'arrow-long-right';
            iconAfter = <Icon {...iconProps} />;
            break;
    }

    return (
        <Tag
            className={className}
            ref={ref}
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
});

Button.defaultProps = {
    color: null,
    disabled: false,
    href: null,
    size: null,
    text: null,
    type: 'button',
    variant: 'primary'
};

Button.displayName = 'Button';
