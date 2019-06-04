export interface IButtonsGroupProps {
    size?: 'large';
}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface IButtonsGroupInheritedProps extends
    IButtonsGroupProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
