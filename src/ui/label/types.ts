export interface ILabelProps {
    ref?: any;
}

export type IConflictFreeHTMLAttributes<E> = React.LabelHTMLAttributes<E>;

export interface ILabelInheritedProps extends
    ILabelProps,
    IConflictFreeHTMLAttributes<HTMLLabelElement>
{
    disabled?: boolean;
}
