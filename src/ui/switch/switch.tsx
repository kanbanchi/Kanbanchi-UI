import * as React from 'react';
import { ISwitchProps } from './types';
import { ClassNames } from '../utils';
import { Label } from '../../ui';
import '../../../src/ui/switch/switch.module.scss';

export const Switch: React.SFC<
    ISwitchProps
    & React.InputHTMLAttributes<HTMLElement>
> = (props) => {
    let {
        children,
        className,
        color,
        ...attributesOriginal
    } = props,
        attributes:React.InputHTMLAttributes<HTMLElement> = attributesOriginal;

    className = ClassNames(
        'kui-switch',
        (!attributes.disabled && color) ? 'kui-switch--color_' + color : null,
        (attributes.disabled) ? 'kui-switch--disabled' : null,
        className
    );

    if (attributes.disabled) attributes.checked = false;
    
    return (
        <Label className={className}>
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
}

Switch.defaultProps = {
    checked: false,
    onChange: (): void => undefined,
    color: null
}

Switch.displayName = 'Switch';
