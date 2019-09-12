export interface IModalButtonStateProps {
    text: string;
}

export interface IModalButtonDispatchProps {
    onClick?: () => void;
}

export interface IModalButtonOwnProps {
    isPrimary?: boolean;
}

export interface IModalButtonProps extends
    IModalButtonStateProps,
    IModalButtonDispatchProps,
    IModalButtonOwnProps
{}

export interface IModalStateProps {
    title: string;
}

export interface IModalDispatchProps {
    onClose: () => void;
}

export interface IModalOwnProps {
    buttons?: IModalButtonProps[];
    variant?:
        'actions' |
        'release';
}

export interface IModalProps extends
    IModalStateProps,
    IModalDispatchProps,
    IModalOwnProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'title'
    >>;

export interface IModalInheritedProps extends
    IModalProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
