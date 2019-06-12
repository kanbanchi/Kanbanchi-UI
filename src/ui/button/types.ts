import { ITooltipProps } from './../tooltip/types';
import { IMediaScreens } from './../types';

export interface IButtonStateProps {
    disabled?: boolean;
    text?: string;
}

export interface IButtonDispatchProps {}

export interface IButtonProps extends
    IButtonStateProps,
    IButtonDispatchProps
{
    color?:
        'black'
        | 'purple'
        | 'white';
    href?: string;
    maxWidth?: IMediaScreens;
    size?: 'large';
    tooltip?: string | ITooltipProps;
    type?:
        'button'
        | 'submit';
    variant?:
        'action'
        | 'add'
        | 'fab'
        | 'icon'
        | 'icon-text'
        | 'primary'
        | 'secondary'
        | 'text';
}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.ButtonHTMLAttributes<E>, Exclude<keyof React.ButtonHTMLAttributes<E>,
        'color'
        | 'type'
    >>;

export interface IButtonInheritedProps extends
    IButtonProps,
    IConflictFreeHTMLAttributes<HTMLButtonElement>
{}
