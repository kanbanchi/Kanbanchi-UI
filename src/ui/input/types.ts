import { ITooltipProps } from './../tooltip/types';

export interface IInputStateProps {
    disabled?: boolean;
    state?: 'error' | 'success';
    tooltip?: string | ITooltipProps;
    value?: string;
}

export interface IInputDispatchProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onEnter?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export interface IInputOwnProps {
    autosize?: boolean;
    color?: 'grey';
    icon?: string;
    isClearable?: boolean;
    label?: string;
    ref?: any;
    type?: string;
    variant?:
        'arrow'
        | 'datepicker'
        | 'header'
        | 'priority'
        | 'search'
        | 'withicon';
}

export interface IInputProps extends
    IInputStateProps,
    IInputDispatchProps,
    IInputOwnProps
{}

export interface IInputPublicProps extends
    IInputStateProps,
    IInputOwnProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.InputHTMLAttributes<E>, Exclude<keyof React.InputHTMLAttributes<E>,
        'color'
        | 'value'
        | 'onChange'
    >>;

export interface IInputInheritedProps extends
    IInputProps,
    IConflictFreeHTMLAttributes<HTMLInputElement>
{}
