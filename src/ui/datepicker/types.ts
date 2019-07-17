import { IInputPublicProps } from './../input/types';

export interface IDatepickerStateProps {
    dateFormat?: string;
    maxDate?: Date;
    minDate?: Date;
    popperPlacement?: string;
    selected: Date;
}

export interface IDatepickerDispatchProps {
    onChange: (date: Date) => void;
}

export interface IDatepickerOwnProps {
    dateFormat?: string;
    maxDate?: Date;
    minDate?: Date;
    popperPlacement?: string;
    selected: Date;
    showMonthDropdown?: boolean;
    showYearDropdown?: boolean;
}

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
