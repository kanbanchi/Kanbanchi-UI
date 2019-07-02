export interface ISelectListStateProps {
    active?: number;
    loading?: boolean;
}

export interface ISelectListOwnProps {
    fixActive?: boolean; // --noactive class for button actions,
    onSelectListInit?: (refs: Array<{}>) => void;
}

export interface ISelectListProps extends
    ISelectListStateProps,
    ISelectListOwnProps
{}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface ISelectListInheritedProps extends
    ISelectListProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
