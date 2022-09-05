import * as React from 'react';
import { IDatePickerInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Input } from '../../ui';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../src/ui/datepicker/datepicker.module.scss';
import { ReactDatePickerProps } from 'react-datepicker';

// accessibility ok+-
// можно обновить до 3.4.1, там со скринридером всё хорошо, не нужны эти костыли, но проблемы с зависимостями
// upd 4.3.0

export const Datepicker: React.FC<IDatePickerInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        className,
        datepicker,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-datepicker',
        // (disabled) ? 'kui-datepicker--disabled' : null,
        // (readOnly) ? 'kui-datepicker--readonly' : null,
        className
    );

    // const datepickerRef = React.useRef(null);
    // const pickerRef = React.useRef(null);

    // isClearable = readOnly || disabled ? false : isClearable;
    // editable = readOnly || disabled ? false : editable;

    // const inputAttributes = {
    //     autoFocus,
    //     color,
    //     editable,
    //     icon,
    //     isClearable,
    //     iconTooltip,
    //     label,
    //     readOnly,
    //     ref,
    //     state,
    //     value,
    //     variant,
    //     onEnter: () => {
    //         if (!pickerRef.current.isCalendarOpen()) {
    //             pickerRef.current.onInputClick(); // open dropdown
    //         }
    //     }
    // };

    // const onChangeHandler = (date: Date) => {
    //     if (onChange) onChange(date);
    // }

    // const onBlurHandler = (e: React.FocusEvent) => {
    //     if (e && e.relatedTarget) {
    //         const closest = e.relatedTarget.closest('.kui-datepicker');
    //         if (closest && closest === datepickerRef.current) return;
    //     }
    //     pickerRef.current.setOpen(false);
    // }

    // /**
    //  * KNB-2481 bug with input blur/focus on ios/macos https://codepen.io/cliener/pen/ooGpwW
    //  * solution from https://github.com/cliener/input-fixer
    //  */
    // const lastEventTime = React.useRef(0);
    // const throttleDuration = 300; // ms
    // const throttleEvent = (event: React.FocusEvent) => {
    //     const timeStamp = event.timeStamp;

    //     if (timeStamp < (lastEventTime.current + throttleDuration)) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         console.log('stop');
    //         return false;
    //     }
    //     console.log(lastEventTime.current - timeStamp, event.target, event.relatedTarget);
    //     lastEventTime.current = timeStamp; // Only set the new time stamp if the event is valid
    // }

    return (
        <Input
            className={className}
            datepicker={datepicker}
            {...attributes}
            ref={ref}
        />
    );
});

Datepicker.defaultProps = {
    // color: null,
    // dateFormat: 'd MMM yyyy',
    editable: true,
    // isClearable: true,
    // iconTooltip: null,
    // label: null,
    // selected: null,
    value: '',
    // variant: 'datepicker',
    onChange: (): void => undefined
};

Datepicker.displayName = 'Datepicker';
