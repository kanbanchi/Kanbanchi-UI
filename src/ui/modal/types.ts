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

export interface IModalReleaseFooterFollowSocialProps {
    icon: string;
    link: string;
    name: string;
}

export interface IModalReleaseFooterFollowProps {
    socials: IModalReleaseFooterFollowSocialProps[];
    text: string;
}

export interface IModalReleaseFooterProps {
    stars: string;
    follow: IModalReleaseFooterFollowProps;
}

export interface IModalReleaseSlideProps {
    description: string;
    src: string;
    title: string;
    variant: 'img' | 'video';
}

export interface IModalReleaseProps {
    footer: IModalReleaseFooterProps;
    slides: IModalReleaseSlideProps[];
}

export interface IModalStateProps {
    title: string;
}

export interface IModalDispatchProps {
    onClose: () => void;
}

export interface IModalOwnProps {
    buttons?: IModalButtonProps[];
    release?: IModalReleaseProps;
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
