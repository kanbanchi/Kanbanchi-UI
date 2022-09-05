import { IInputInheritedProps } from './../input/types';
import type { ReactDatePickerProps } from 'react-datepicker';

export interface IDatePickerInheritedProps extends
    IInputInheritedProps
{
    datepicker?: ReactDatePickerProps;
}
