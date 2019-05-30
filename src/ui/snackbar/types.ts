export enum ISnackbarDefaultIcons {
    error = 'error',
    info = 'info',
    success = 'done',
    timer = 'error'
}

export interface ISnackbarDispatchProps {
    onTimer?: () => void;
}

export interface ISnackbarButtonProps {
    text: string;
    onClick?: () => void;
    onTimer?: boolean;
}

export interface ISnackbarProps extends
    ISnackbarDispatchProps
{
    buttons?: Array<ISnackbarButtonProps>;
    icon?: string;
    text?: string;
    timer?: number;
    title?: string;
    variant?:
        'error'
        | 'info'
        | 'success'
        | 'timer';
}
