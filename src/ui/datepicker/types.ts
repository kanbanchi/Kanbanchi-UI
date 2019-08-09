import { IInputPublicProps } from './../input/types';
import { Placement, Modifiers } from 'popper.js';

export interface IDatepickerStateProps {
    selected: Date;
}

export interface IDatepickerDispatchProps {
    onChange: (date: Date) => void;
}

export interface IDatepickerOwnProps {
    dateFormat?: string;
    editable?: boolean;
    maxDate?: Date;
    minDate?: Date;
    popperModifiers?: Modifiers;
    popperPlacement?: Placement;
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
