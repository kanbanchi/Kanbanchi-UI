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
        editable,
        label,
        isClearable,
        selected,
        value,
        variant,
        onChange,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-datepicker',
        className
    );

    const pickerRef = React.useRef(null);

    const inputAttributes = {
        color,
        editable,
        isClearable,
        label,
        ref,
        value,
        variant
    };

    const onChangeHandler = (date: Date) => {
        pickerRef.current.input.setIsFilled(date);
        if (onChange) onChange(date);
    }

    return (
        <div
            className={className}
        >
            <ReactDatepickerElement
                customInput={<Input {...inputAttributes}/>}
                locale="en-GB"
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
    label: null,
    selected: null,
    value: '',
    variant: 'datepicker',
    onChange: (): void => undefined
};

Datepicker.displayName = 'Datepicker';
