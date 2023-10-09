import { IButtonInheritedProps } from '../button/types';

export interface IModalButtonProps extends
    IButtonInheritedProps
{
    text: string;
    isOpenedAfterClick?: boolean;
    isPrimary?: boolean;
}

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
    src?: string;
    title: string;
    variant?: 'img' | 'video';
}

export interface IModalReleaseProps {
    footer?: IModalReleaseFooterProps;
    slides: IModalReleaseSlideProps[];
}

export interface IModalStateProps {
    blockSelector?: string; // селктор основного контента, который заблокировать (запретить tab) при показе модалки
    title: string;
}

export interface IModalDispatchProps {
    onClose: () => void;
}

export interface IModalOwnProps {
    buttons?: IModalButtonProps[];
    isNotFocusLock?: boolean;
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
