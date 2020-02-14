import { IMediaScreens } from './../types';

export interface ITooltipStateProps {
    delay?: number;
    delayClose?: number;
    direction?:
        'up'
        | 'up-left'
        | 'up-right'
        | 'left'
        | 'right'
        | 'down'
        | 'down-left'
        | 'down-right';
    footer?: any;
    link?: any;
    maxWidth?: IMediaScreens;
    state?: 'error' | 'success';
    value: string;
}

export interface ITooltipDispatchProps {
    onShow?: () => void;
}

export interface ITooltipProps extends
    ITooltipStateProps,
    ITooltipDispatchProps
{}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface ITooltipInheritedProps extends
    ITooltipProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
