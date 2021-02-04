export interface ISelectListItemProps {
    icon?: string;
    iconSize?: 16 | 24;
    list?: string;
    listLabel?: string;
    value?: string;
}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface ISelectListItemInheritedProps extends
    ISelectListItemProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
