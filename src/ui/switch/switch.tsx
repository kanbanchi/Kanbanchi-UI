import * as React from 'react';
import { ISwitchInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Label } from '../../ui';
import './switch.module.scss';

// accessibility ok

export const Switch: React.FC<ISwitchInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        color,
        direction,
        htmlBefore,
        ...attributesOriginal
    } = props,
        attributes: React.InputHTMLAttributes<HTMLElement> = attributesOriginal;

    className = ClassNames(
        'kui-switch',
        (color) ? 'kui-switch--color_' + color : null,
        (direction) ? 'kui-switch--direction_' + direction : null,
        (attributes.disabled) ? 'kui-switch--disabled' : null,
        className
    );

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!e || attributes.disabled) return;
        if (e.key === ' ') {
            e.preventDefault();
            attributes.onChange && attributes.onChange(e as any);
        }
    }

    return (
        <Label
            className={className}
            tabIndex={0}
            role={'switch'}
            aria-checked={attributes.checked}
            aria-disabled={attributes.disabled}
            onKeyDown={onKeyDown}
            ref={ref as any}
        >
            {htmlBefore}
            <input
                className="kui-switch__input"
                type="checkbox"
                {...attributes}
            />
            <span className="kui-switch__label">
                {children}
            </span>
        </Label>
    );
});

Switch.defaultProps = {
    checked: false,
    onChange: (): void => undefined,
    direction: 'right',
}

Switch.displayName = 'Switch';
