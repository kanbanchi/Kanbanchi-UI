import * as React from 'react';
import { IDatePickerInheritedProps } from './types';
import ReactDatepicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import { ClassNames } from '../utils';
import { Input } from '../../ui';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../src/ui/datepicker/datepicker.module.scss';

// @ts-ignore
window.intv = setInterval(() => {
    // @ts-ignore
    if (window.curEl !== document.activeElement) {
      // @ts-ignore
        window.curEl = document.activeElement;
      console.log(document.activeElement);
    }
  }, 100);

const ReactDatepickerElement = ReactDatepicker as any;

registerLocale('en-GB', enGB); // Weeks start on Monday

// accessibility ok+-
// можно обновить до 3.4.1, там со скринридером всё хорошо, не нужны эти костыли, но проблемы с зависимостями
// upd 4.3.0

export const Datepicker: React.FC<IDatePickerInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        className,
        // @ts-ignore
        autoFocus = false,
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
    editable = readOnly || disabled ? false : editable;

    const inputAttributes = {
        autoFocus,
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
    }

    const onBlurHandler = (e: React.FocusEvent) => {
        if (e && e.relatedTarget) {
            const closest = e.relatedTarget.closest('.kui-datepicker');
            if (closest && closest === datepickerRef.current) return;
        }
        pickerRef.current.setOpen(false);
        setTimeout(()=>pickerRef.current.setFocus(false), 100);
        console.log(document.activeElement);
    }

    /**
     * KNB-2481 bug with input blur/focus on ios/macos https://codepen.io/cliener/pen/ooGpwW
     * solution from https://github.com/cliener/input-fixer
     */
    const lastEventTime = React.useRef(0);
    const throttleDuration = 300; // ms
    const throttleEvent = (event: React.FocusEvent) => {
        const timeStamp = event.timeStamp;

        if (timeStamp < (lastEventTime.current + throttleDuration)) {
            event.preventDefault();
            event.stopPropagation();
            console.log('stop');
            return false;
        }
        console.log(timeStamp-lastEventTime.current, event, event.target, event.relatedTarget);
        lastEventTime.current = timeStamp; // Only set the new time stamp if the event is valid
    }

    return (
        <div
            className={className}
            ref={datepickerRef}
            tabIndex={-1}
            onBlur={onBlurHandler}
            onFocusCapture={throttleEvent}
            onBlurCapture={throttleEvent}
        >
            <ReactDatepickerElement
                customInput={<Input {...inputAttributes}/>}
                disabled={disabled}
                locale="en-GB"
                readOnly={readOnly}
                ref={pickerRef}
                selected={selected}
                onChange={onChangeHandler}
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
