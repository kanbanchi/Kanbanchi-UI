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
        ...attributes
    } = props;

    className = ClassNames(
        'kui-datepicker',
        (disabled) ? 'kui-datepicker--disabled' : null,
        (readOnly) ? 'kui-datepicker--readonly' : null,
        className
    );

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
        variant
    };

    const onChangeHandler = (date: Date) => {
        if (onChange) onChange(date);
    }

    return (
        <div
            className={className}
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
