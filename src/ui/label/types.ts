export interface ILabelProps {

}

export type IConflictFreeHTMLAttributes<E> = React.LabelHTMLAttributes<E>;

export interface ILabelInheritedProps extends
    ILabelProps,
    IConflictFreeHTMLAttributes<HTMLLabelElement>
{}
