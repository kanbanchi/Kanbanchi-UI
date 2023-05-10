import { ITooltipProps } from './../tooltip/types';

export interface IInputStateProps {
    disabled?: boolean;
    state?: 'error' | 'success';
    tooltip?: string | ITooltipProps;
    value?: string;
}

export interface IInputDispatchProps {
    onChange?: (event: React.SyntheticEvent<HTMLElement>) => void;
    onEnter?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export interface IInputOwnProps {
    autosize?: boolean;
    color?: 'grey';
    editable?: boolean;
    icon?: string;
    isClearable?: boolean;
    iconTooltip?: string | ITooltipProps;
    label?: string;
    readOnly?: boolean;
    ref?: any;
    searchPlaceholder?: string;
    size?: 'small';
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
        | 'type'
        | 'value'
        | 'onChange'
    >>;

export interface IInputInheritedProps extends
    IInputProps,
    IConflictFreeHTMLAttributes<HTMLInputElement>
{}
