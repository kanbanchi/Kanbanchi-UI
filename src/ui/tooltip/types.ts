import { IMediaScreens } from './../types';

export type TTooltipDirection =
    'up' |
    'up-left' |
    'up-right' |
    'left' |
    'right' |
    'down' |
    'down-left' |
    'down-right';

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
    direction?: TTooltipDirection;
    footer?: any;
    header?: string;
    isHidable?: boolean;
    isNoEvents?: boolean;
    isNoWrap?: boolean;
    isPortal?: boolean;
    isScrollFit?: boolean; // нужно ли проверять скролл у контейнера при позиционировании
    link?: any;
    maxWidth?: IMediaScreens;
    portalId?: string;
    portalSelector?: string;
    selector?: string;
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
    onHide?: () => void;
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
