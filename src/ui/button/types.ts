import { ITooltipProps } from './../tooltip/types';
import { IMediaScreens } from './../types';

export type TButtonVariant =
    'action' |
    'add' |
    'fab' |
    'icon' |
    'icon-text' |
    'primary' |
    'secondary' |
    'text';

export type TButtonColor =
    'black' |
    'purple' |
    'white';

export type TButtonSize = 'large';

export type TButtonType =
    'button' |
    'submit';

export interface IButtonStateProps {
    disabled?: boolean;
    href?: string;
    progress?: number; // percentage 0..100
    text?: string;
    tooltip?: string | ITooltipProps;
}

export interface IButtonDispatchProps {
    onClick?: (e?: any) => void;
}

export interface IButtonOwnProps {
    color?: TButtonColor;
    maxWidth?: IMediaScreens;
    ref?: any;
    size?: TButtonSize;
    type?: TButtonType;
    variant?: TButtonVariant;
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
    >> &
    Pick<React.AnchorHTMLAttributes<E>, Exclude<keyof React.AnchorHTMLAttributes<E>,
        'color'
        | 'type'
        | 'onClick'
    >>;

export interface IButtonInheritedProps extends
    IConflictFreeHTMLAttributes<HTMLButtonElement>,
    IButtonProps
{}
