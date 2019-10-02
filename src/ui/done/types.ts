export interface IDoneProps {
    percent: number;
}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface IDoneInheritedProps extends
    IDoneProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
