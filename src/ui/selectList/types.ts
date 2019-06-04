export interface ISelectListStateProps {
    active?: number;
    loading?: boolean;
}

export interface ISelectListProps extends
    ISelectListStateProps
{
    fixActive?: boolean; // --noactive class for button actions,
    onSelectListInit?: (refs: Array<{}>) => void;
}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface ISelectListInheritedProps extends
    ISelectListProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
