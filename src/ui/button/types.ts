import { ITooltipProps } from './../tooltip/types';
import { IMediaScreens } from './../types';

type ButtonVariant = 'action'
        | 'add'
        | 'fab'
        | 'icon'
        | 'icon-text'
        | 'primary'
        | 'secondary'
        | 'text';

export interface IButtonStateProps {
    disabled?: boolean;
    href?: string;
    progress?: number; // percentage 0..100
    text?: string;
    tooltip?: string | ITooltipProps;
}

export interface IButtonDispatchProps {
    onClick?: () => void;
}

export interface IButtonOwnProps {
    color?:
        'black'
        | 'purple'
        | 'white';
    maxWidth?: IMediaScreens;
    size?: 'large';
    type?:
        'button'
        | 'submit';
    variant?: ButtonVariant;
}

export interface IButtonProps extends
    IButtonStateProps,
    IButtonDispatchProps,
    IButtonOwnProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.ButtonHTMLAttributes<E>, Exclude<keyof React.ButtonHTMLAttributes<E>,
        'color'
        | 'type'
        | 'onClick'
    >>;

export interface IButtonInheritedProps extends
    IConflictFreeHTMLAttributes<HTMLButtonElement>,
    IButtonProps
{}
