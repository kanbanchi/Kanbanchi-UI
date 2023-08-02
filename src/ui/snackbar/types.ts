export interface ISnackbarButtonStateProps {
    progress?: number; // percentage 0..100
    isTimer?: boolean;
    text: string;
}

export interface ISnackbarButtonDispatchProps {
    onClick?: () => void;
}

export interface ISnackbarButtonOwnProps {
    isPrimary?: boolean;
    icon?: string;
}

export interface ISnackbarButtonProps extends
    ISnackbarButtonStateProps,
    ISnackbarButtonDispatchProps,
    ISnackbarButtonOwnProps
{}

export interface ISnackbarStateProps {
    buttons?: Array<ISnackbarButtonProps>;
    text?: string;
    title?: string;
}

export interface ISnackbarDispatchProps {
    onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
    onTimer?: () => void;
}

export interface ISnackbarOwnProps {
    icon?: string;
    textIcon?: string;
    titleIcon?: string;
    key: string;
    timer?: number;
}

export interface ISnackbarProps extends
    ISnackbarStateProps,
    ISnackbarDispatchProps,
    ISnackbarOwnProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'onBlur'
    >>;

export interface ISnackbarInheritedProps extends
    IConflictFreeHTMLAttributes<HTMLElement>,
    ISnackbarProps
{}
