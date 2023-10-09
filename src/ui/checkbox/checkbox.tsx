import * as React from 'react';
import { ICheckboxInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Icon, Label } from '../../ui';
import '../../../src/ui/checkbox/checkbox.module.scss';

// accessibility ok

export const Checkbox: React.FC<ICheckboxInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        checked,
        color,
        direction,
        isIndeterminate,
        isStateless,
        labelStyle,
        tabIndex = 0,
        ['aria-selected']: ariaSelected,
        ['data-index']: dataIndex,
        onChange,
        ...attributesOriginal
    } = props,
        attributes: React.InputHTMLAttributes<HTMLElement> = attributesOriginal;

    const [isChecked, setIsChecked] = React.useState(checked);

    className = ClassNames(
        'kui-checkbox',
        (isIndeterminate) ? 'kui-checkbox--indeterminate' : null,
        (color) ? 'kui-checkbox--color_' + color : null,
        (direction) ? 'kui-checkbox--direction_' + direction : null,
        (props.disabled) ? 'kui-checkbox--disabled' : null,
        className
    );

    attributes.type = 'checkbox';
    attributes.className = 'kui-checkbox__input';
    attributes.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isStateless) setIsChecked(!isChecked);
        if (onChange) onChange(e);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!e || attributes.disabled) return;
        if (e.key === ' ') {
            e.preventDefault();
            attributes.onChange(e as any);
        }
    }

    React.useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    return (
        <Label
            className={className}
            ref={ref as any}
            tabIndex={tabIndex}
            role={'checkbox'}
            aria-checked={isChecked}
            aria-disabled={attributes.disabled}
            aria-selected={ariaSelected}
            data-index={dataIndex}
            onKeyDown={onKeyDown}
            style={labelStyle}
        >
            <input checked={isChecked} {...attributes}/>
            <span className="kui-checkbox__label">
                {children}
                <Icon className="kui-checkbox__checkmark" xlink="done"/>
            </span>
        </Label>
    );
});

Checkbox.defaultProps = {
    checked: false,
    onChange: (): void => undefined,
    color: null,
    direction: 'right',
}

Checkbox.displayName = 'Checkbox';
