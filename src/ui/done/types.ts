export interface IDoneProps {
    percent: number;
    titleDone?: string;
    titleNotDone?: string;
}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface IDoneInheritedProps extends
    IDoneProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
