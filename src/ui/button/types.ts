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
    color?:
        'black'
        | 'purple'
        | 'white';
    disabled?: boolean;
    href?: string;
    maxWidth?: IMediaScreens;
    progress?: number; // percentage 0..100
    size?: 'large';
    text?: string;
    tooltip?: string | ITooltipProps;
    type?:
        'button'
        | 'submit';
    variant?: ButtonVariant;
}

export interface IButtonDispatchProps {
    onClick?: () => void;
}

export interface IButtonProps extends
    IButtonStateProps,
    IButtonDispatchProps
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
