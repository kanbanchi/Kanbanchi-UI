export interface ILoaderProps {
    size?: 'large';
}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface ILoaderInheritedProps extends
    ILoaderProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
