import * as React from 'react';
import { IInputInheritedProps } from './types';
import { ClassNames } from '../utils';
import * as autosizeLibray from './autosize';
import { Icon, Label, Tooltip } from '../../ui';
import '../../../src/ui/input/input.module.scss';

export const Input: React.SFC<IInputInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        autosize,
        className,
        color,
        disabled,
        editable,
        icon,
        isClearable,
        iconTooltip,
        label,
        readOnly,
        searchPlaceholder,
        state,
        tooltip,
        value,
        variant,
        onBlur,
        onChange,
        onEnter,
        onFocus,
        onKeyDown,
        ...attributesOriginal
    } = props,
        attributes: React.InputHTMLAttributes<HTMLElement> = attributesOriginal,
        labelItem = null,
        inputBefore = null,
        inputAfter = null;

    const [isFilled, setIsFilled] = React.useState(!!value);
    const [isFocusedHook, setIsFocusedHook] = React.useState(false);
    const textarea = React.useRef(null);
    const timer = React.useRef(null);

    className = ClassNames(
        'kui-input',
        (color) ? 'kui-input--color_' + color: null,
        (disabled) ? 'kui-input--disabled' : null,
        (isFilled) ? 'kui-input--filled' : null,
        (isFocusedHook) ? 'kui-input--focus' : null,
        (!autosize) ? 'kui-input--noresize' : null,
        (readOnly) ? 'kui-input--readonly' : null,
        (state) ? 'kui-input--state_' + state : null,
        (variant) ? 'kui-input--variant_' + variant : null,
        className
    );

    attributes.className = 'kui-input__item';

    attributes.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFilled(!!e.target.value);
        if (onChange) onChange(e);
    };

    attributes.onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e && e.which === 13) {
            if (!autosize) e.preventDefault();
            if (onEnter) onEnter(e);
        }
        if (onKeyDown) onKeyDown(e);
    };

    /**
     * Проблема: при клике на иконку инпут получает одновременно onBlur и onFocus
     */

    attributes.onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!document.hasFocus()) return;

        if (e) e.persist();
        timer.current = setTimeout(() => {
            if (isFocusedHook) {
                setIsFocusedHook(false);
                if (onBlur) onBlur(e);
            }
        }, 200);
    }

    attributes.onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e) e.persist();
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            if (!isFocusedHook) {
                setIsFocusedHook(true);
                if (onFocus) onFocus(e);
            }
        }, 100);
    }

    if (label) {
        labelItem = (<div className="kui-label__item">{label}</div>);
    }

    const clearInput = (e: React.MouseEvent<HTMLElement>) => {
        if (disabled) return;

        e.preventDefault();
        setIsFilled(false);
        textarea.current.value = '';
        if (variant !== 'datepicker'){
            textarea.current.focus();
        }
        if (onChange) onChange(e);
    };

    const iconClear = <Icon
            xlink="clear"
            size={24}
            className="kui-input__icon kui-input__icon--clear"
            onClick={clearInput}
        />;

    const getIconOrTooltip = () => {
        if (iconTooltip) {
            const tooltipProps = (typeof iconTooltip === 'string')
                ? { value: iconTooltip }
                : iconTooltip;
            return (
                <Tooltip {...tooltipProps}>
                    {iconClear}
                </Tooltip>
            )
        }
        return iconClear
    };

    if (isClearable) {
        inputAfter = getIconOrTooltip();
    }

    if (variant === 'arrow' || variant === 'header') {
        inputAfter = <Icon
            xlink="arrow-down"
            size={24}
            className="kui-input__icon kui-input__icon--arrow"
        />;
    } else if
        (variant === 'datepicker') {
        attributes.readOnly = !editable;
        autosize = false;
        icon = icon || 'calendar';
        const iconCalendar = <Icon
            xlink={icon}
            size={24}
            className="kui-input__icon"
        />;
        if (isClearable) {
            inputAfter = (isFilled) ? getIconOrTooltip() : iconCalendar;
        } else {
            inputAfter = iconCalendar;
        }
    } else if
        (variant === 'search') {
        inputBefore = (<span className="kui-input-search">
            <Icon
                xlink="search"
                size={24}
                className="kui-input-search__icon"
            />
            <span className="kui-input-search__placeholder">
                {searchPlaceholder}
            </span>
        </span>);
        inputAfter = getIconOrTooltip();
    } else if
        (icon && variant === 'withicon') {
        inputAfter = <Icon
            xlink={icon}
            size={24}
            className="kui-input__icon"
        />;
    }

    const Tag = (autosize) ? 'textarea' : 'input';

    React.useEffect(() => {
        textarea.current.value = value;
        setIsFilled(!!value);
        autosizeLibray.default.update(textarea.current);
    }, [value]);

    React.useEffect(() => {
        if (autosize) autosizeLibray.default(textarea.current);

        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, []);

    React.useImperativeHandle(ref, () => ({
        setIsFilled(value: string) {
            setIsFilled(!!value);
        },
        getBoundingClientRect() {
            return textarea.current.getBoundingClientRect();
        },
        setFocus(e: React.FocusEvent<HTMLInputElement>) {
            textarea.current.focus();
            attributes.onFocus(e);
        },
        getInput() {
            return textarea.current;
        },
    }));

    let inputElement = (
        <Tag
            disabled={disabled}
            readOnly={readOnly}
            rows={1}
            ref={textarea}
            {...attributes}
        />
    );

    if (tooltip) {
        const tooltipProps = (typeof tooltip === 'string')
            ? { value: tooltip }
            : tooltip;

        if (state && !tooltipProps.state) tooltipProps.state = state;
        inputElement = (
            <Tooltip {...tooltipProps}>
                {inputElement}
            </Tooltip>
        )
    }

    return (
        <Label
            className={className}
            ref={ref as any}
        >
            {labelItem}
            {inputBefore}
            {inputElement}
            {inputAfter}
        </Label>
    );
});

Input.defaultProps = {
    autosize: true,
    color: null,
    disabled: false,
    editable: true,
    icon: null,
    isClearable: false,
    iconTooltip: null,
    label: null,
    searchPlaceholder: 'Search',
    state: null,
    tooltip: null,
    value: '',
    variant: null,
    onEnter: (): void => undefined
}

Input.displayName = 'Input';
