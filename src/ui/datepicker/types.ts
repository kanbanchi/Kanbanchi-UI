import { IInputPublicProps } from './../input/types';
import type { ReactDatePickerProps } from 'react-datepicker';

export interface IDatepickerStateProps {
    editable?: boolean;
    selected?: Date | null;
}

export interface IDatepickerDispatchProps {
    onChange: (date: Date) => void;
}

export type IDatepickerOwnProps = Pick<ReactDatePickerProps,
    'dateFormat' |
    'inline' |
    'maxDate' |
    'minDate' |
    'placeholderText' |
    'popperModifiers' |
    'popperPlacement' |
    'showMonthDropdown' |
    'showYearDropdown'
>;

export interface IDatepickerProps extends
    IDatepickerStateProps,
    IDatepickerDispatchProps,
    IDatepickerOwnProps,
    IInputPublicProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'color'
        | 'onChange'
    >>;

export interface IDatePickerInheritedProps extends
    IConflictFreeHTMLAttributes<HTMLElement>,
    IDatepickerProps
{}
