import * as React from 'react';
import { IDatePickerInheritedProps } from './types';
import ReactDatepicker, { registerLocale } from 'react-datepicker';
import * as enGB from 'date-fns/locale/en-GB';
import { ClassNames } from '../utils';
import { Input } from '../../ui';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../src/ui/datepicker/datepicker.module.scss';

const ReactDatepickerElement = ReactDatepicker as any;

registerLocale('en-GB', enGB); // Weeks start on Monday

// accessibility ok+-
// можно обновить до 3.4.1, там со скринридером всё хорошо, не нужны эти костыли, но проблемы с зависимостями

export const Datepicker: React.SFC<IDatePickerInheritedProps> =
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
        value,
        variant,
        onChange,
        onKeyDown,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-datepicker',
        (disabled) ? 'kui-datepicker--disabled' : null,
        (readOnly) ? 'kui-datepicker--readonly' : null,
        className
    );

    const [ariaLabel, setAriaLabel] = React.useState(selected ? selected.toDateString() : '');
    const datepickerRef = React.useRef(null);
    const pickerRef = React.useRef(null);

    isClearable = readOnly || disabled ? false : isClearable;
    editable = readOnly || disabled ? false : editable;

    const inputAttributes = {
        color,
        editable,
        icon,
        isClearable,
        iconTooltip,
        label,
        readOnly,
        ref,
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
    }

    /**
     * react-datepicker частично поддерживает accessibility, но не дружит со скринридером
     * при выборе дат стрелками инфа дублируется в aria-live
     */
    const _setAriaLabel = () => {
        const month = datepickerRef.current.querySelector('.react-datepicker__current-month') as HTMLElement;
        const selected = datepickerRef.current.querySelector('.react-datepicker__day--keyboard-selected') as HTMLElement;
        let label = (selected ? selected.innerHTML : '') + ' ' + (month ? month.innerHTML : '');
        setAriaLabel(label);
    }
    const onKeyDownHandler = (e: any) => {
        if (onKeyDown) onKeyDown(e);
        if (
            e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || // переключение дней
            e.key === 'PageDown' || e.key === 'PageUp' || // переключение месяцев
            e.key === 'Home' || e.key === 'End' // переключение лет (не соответствует accessibility)
        ) {
            requestAnimationFrame(_setAriaLabel);
        }
    }

    return (
        <div
            className={className}
            ref={datepickerRef}
        >
            <ReactDatepickerElement
                customInput={<Input {...inputAttributes}/>}
                disabled={disabled}
                locale="en-GB"
                readOnly={readOnly}
                ref={pickerRef}
                selected={selected}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                {...attributes}
            />
            <div // невидимый блок для скринридера
                className={'kui-datepicker__aria-label'}
                aria-live={'assertive'}
            >
                {ariaLabel}
            </div>
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
