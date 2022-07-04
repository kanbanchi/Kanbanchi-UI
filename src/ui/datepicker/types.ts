import { IInputPublicProps } from './../input/types';
import type { Placement, Modifier } from '@popperjs/core';

export interface IDatepickerStateProps {
    selected: Date;
}

export interface IDatepickerDispatchProps {
    onChange: (date: Date) => void;
}

export interface IDatepickerOwnProps {
    dateFormat?: string;
    editable?: boolean;
    inline?: boolean;
    maxDate?: Date;
    minDate?: Date;
    placeholderText?: string;
    popperModifiers?: Modifier<'custom', { customOption: boolean }>[];
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
