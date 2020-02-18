import { IMediaScreens } from './../types';

export interface ITooltipStateProps {
    arrow?:
        'down' |
        'left' |
        'right' |
        'up';
    arrowTranslate?: {
        top?: number,
        right?: number,
        bottom?: number,
        left?: number,
    };
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
    header?: string;
    link?: any;
    maxWidth?: IMediaScreens;
    show?: boolean;
    state?: 'error' | 'success';
    translate?: {
        top?: number,
        right?: number,
        bottom?: number,
        left?: number,
    };
    value: string;
    variant?: 'hint';
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
