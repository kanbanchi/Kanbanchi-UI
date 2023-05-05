import * as React from 'react';
import { IDatePickerInheritedProps } from './types';
import ReactDatepicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import { ClassNames } from '../utils';
import { Input } from '../../ui';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../src/ui/datepicker/datepicker.module.scss';

const ReactDatepickerElement = ReactDatepicker as any;
registerLocale('en-GB', enGB); // Weeks start on Monday

// accessibility ok+-
// можно обновить до 3.4.1, там со скринридером всё хорошо, не нужны эти костыли, но проблемы с зависимостями
// upd 4.3.0

export const Datepicker: React.FC<IDatePickerInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        className,
        color,
        disabled,
        editable,
        label,
        icon,
        isClearable,
        iconTooltip,
        readOnly,
        selected,
        state,
        value,
        variant,
        onChange,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-datepicker',
        (disabled) ? 'kui-datepicker--disabled' : null,
        (readOnly) ? 'kui-datepicker--readonly' : null,
        className
    );

    const datepickerRef = React.useRef(null);
    const pickerRef = React.useRef(null);

    isClearable = readOnly || disabled ? false : isClearable;
    editable =  readOnly || disabled ? false : editable;

    const inputAttributes = {
        color,
        editable,
        icon,
        isClearable,
        iconTooltip,
        label,
        readOnly,
        ref,
        state,
        value,
        variant,
        onEnter: () => {
            if (!pickerRef.current.isCalendarOpen()) {
                pickerRef.current.onInputClick(); // open dropdown
            }
        }
    };

    const onChangeHandler = (date: Date) => {
        if (onChange) onChange(date);
        setTimeout(()=>{
            if (document.activeElement === document.body) { // фокус отвалился, вернуть фокус инпуту
                const input = datepickerRef.current.querySelector('input') as HTMLElement;
                if (input) input.focus();
            }
        }, 100);
    }

    const onBlurHandler = (e: React.FocusEvent) => {
        if (e && e.relatedTarget) {
            const closest = e.relatedTarget.closest('.kui-datepicker');
            if (closest && closest === datepickerRef.current) return;
        }
        pickerRef.current.setOpen(false); // был баг: если убрать фокус табом, календарь не закрывается
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e && e.key === 'Escape') {
            e.stopPropagation();
        }
    }

    return (
        <div
            className={className}
            ref={datepickerRef}
            tabIndex={-1}
            onBlur={onBlurHandler}
        >
            <ReactDatepickerElement
                customInput={<Input {...inputAttributes}/>}
                disabled={disabled}
                locale="en-GB"
                readOnly={readOnly}
                ref={pickerRef}
                selected={selected}
                onChange={onChangeHandler}
                onKeyDown={onKeyDown}
                {...attributes}
            />
        </div>
    );
});

Datepicker.defaultProps = {
    color: null,
    dateFormat: 'd MMM yyyy',
    editable: true,
    isClearable: true,
    iconTooltip: null,
    label: null,
    selected: null,
    value: '',
    variant: 'datepicker',
    onChange: (): void => undefined
};

Datepicker.displayName = 'Datepicker';
