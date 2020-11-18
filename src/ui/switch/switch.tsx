import * as React from 'react';
import { ISwitchInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Label } from '../../ui';
import '../../../src/ui/switch/switch.module.scss';

export const Switch: React.FC<ISwitchInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        color,
        ...attributesOriginal
    } = props,
        attributes: React.InputHTMLAttributes<HTMLElement> = attributesOriginal;

    className = ClassNames(
        'kui-switch',
        (color) ? 'kui-switch--color_' + color : null,
        (attributes.disabled) ? 'kui-switch--disabled' : null,
        className
    );

    return (
        <Label className={className} ref={ref as any}>
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
    color: null
}

Switch.displayName = 'Switch';
