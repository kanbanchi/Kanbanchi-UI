export interface ILabelProps {
    ref?: any;
}

export type IConflictFreeHTMLAttributes<E> = React.InputHTMLAttributes<E>;

export interface ILabelInheritedProps extends
    ILabelProps,
    IConflictFreeHTMLAttributes<HTMLInputElement>
{}
