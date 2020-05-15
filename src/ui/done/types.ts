export type TDoneSize = 'large' | 'small';

export interface IDoneProps {
    percent: number;
    size?: TDoneSize;
    titleDone?: string;
    titleNotDone?: string;
}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface IDoneInheritedProps extends
    IDoneProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
