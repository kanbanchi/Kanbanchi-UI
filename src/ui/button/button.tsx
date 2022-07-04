import * as React from 'react';
import { IButtonInheritedProps } from './types';
import { ClassNames, useCombinedRefs } from '../utils';
import { ButtonTitle, Icon, Tooltip } from '../../ui';
import '../../../src/ui/button/button.module.scss';

// accessibility ok (todo не у всех кнопок есть :focus)

export const Button: React.FC<IButtonInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        color,
        maxWidth,
        progress,
        size,
        text,
        tooltip,
        variant,
        ...attributes
    } = props,
        iconBefore = null,
        iconAfter = null,
        childrenDiv = null;

    const _buttonRef = React.useRef(null);
    const buttonRef =  useCombinedRefs(ref, _buttonRef);

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
        (maxWidth) ? 'kui-button--maxwidth_' + maxWidth : null,
        (progress !== null) ? 'kui-button--progress' : null,
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
            iconProps.xlink = 'more';
            iconBefore = <Icon {...iconProps} />;
            break;
        case 'text':
            iconProps.xlink = 'arrow-button';
            iconAfter = <Icon {...iconProps} />;
            break;
    }

    const buttonElement = (
        <Tag
            className={className}
            ref={buttonRef}
            {...attributes}
        >
            {iconBefore}
            {childrenDiv}
            {text &&
                <ButtonTitle>
                    {text}
                </ButtonTitle>
            }
            {progress !== null &&
                <div
                    className="kui-button__progress"
                    style={{width: progress + '%'}}>
                </div>
            }
            {iconAfter}
        </Tag>
    );

    if (tooltip) {
        const tooltipProps = (typeof tooltip === 'string')
            ? { value: tooltip }
            : tooltip;
        return (
            <Tooltip {...tooltipProps}>
                {buttonElement}
            </Tooltip>
        )
    }

    return buttonElement;
});

Button.defaultProps = {
    color: null,
    disabled: false,
    href: null,
    maxWidth: null,
    progress: null,
    size: null,
    text: null,
    tooltip: null,
    type: 'button',
    variant: 'primary'
};

Button.displayName = 'Button';
