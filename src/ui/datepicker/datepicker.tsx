import * as React from 'react';
import { IDatepickerProps } from './types';
import ReactDatepicker, { registerLocale } from 'react-datepicker';
import * as enGB from 'date-fns/locale/en-GB';
import { ClassNames } from '../utils';
import { Input } from '../../ui';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../src/ui/datepicker/datepicker.module.scss';

registerLocale('en-GB', enGB); // Weeks start on Monday

export const Datepicker: React.SFC<IDatepickerProps> = (props) => {
    let {
        className,
        color,
        selected,
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
        variant
    };

    const onChangeHandler = (date: Date) => {
        console.log('input', date);
        pickerRef.current.input.setIsFilled(date);
        if (onChange) onChange(date);
    }

    return (
        <div className={className}>
            <ReactDatepicker
                customInput={<Input {...inputAttributes}/>}
                locale="en-GB"
                ref={pickerRef}
                selected={selected}
                onChange={onChangeHandler}
                {...attributes}
            />
        </div>
    );
}

Datepicker.defaultProps = {
    color: null,
    dateFormat: 'd MMM yyyy',
    selected: null,
    variant: 'datepicker',
    onChange: (): void => undefined
};

Datepicker.displayName = 'Datepicker';
