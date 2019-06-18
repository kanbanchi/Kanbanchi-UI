import { ITooltipProps } from './../tooltip/types';

export interface IInputStateProps {
    value?: string;
}

export interface IInputDispatchProps {
    onChange?: (event: React.SyntheticEvent<HTMLElement>) => void;
    onEnter?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export interface IInputPublicProps {
    autosize?: boolean;
    color?: 'grey';
    disabled?: boolean;
    icon?: string;
    isClearable?: boolean;
    label?: string;
    state?: 'error' | 'success';
    tooltip?: string | ITooltipProps;
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
    IInputPublicProps
{
    ref?: any;
}

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
