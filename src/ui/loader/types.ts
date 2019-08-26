export interface ILoaderStateProps {
    color?:
        'black' |
        'purple' |
        'white';
    size?: 'large';
}

export interface ILoaderDispatchProps {
}

export interface ILoaderProps extends
    ILoaderStateProps,
    ILoaderDispatchProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'color'
    >>;

export interface ILoaderInheritedProps extends
    ILoaderProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
