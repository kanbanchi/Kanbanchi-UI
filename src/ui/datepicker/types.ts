import { IInputPublicProps } from './../input/types';

export interface IDatepickerStateProps {
    maxDate?: Date;
    minDate?: Date;
    selected: Date;
}

export interface IDatepickerDispatchProps {
    onChange: (date: Date) => void;
}

export interface IDatepickerProps extends
    IDatepickerStateProps,
    IDatepickerDispatchProps,
    IInputPublicProps
{
    dateFormat?: string;
    popperPlacement?: string;
}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>, 'color' | 'onChange'>>;

export interface IDatePickerInheritedProps extends
    IDatepickerProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
