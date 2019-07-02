export interface ITabsStateProps {
    active: number;
}

export interface ITabsDispatchProps {
    onChange: (index: number) => void;
}

export interface ITabsOwnProps {
    size?: 'large';
}

export interface ITabsProps extends
    ITabsStateProps,
    ITabsDispatchProps,
    ITabsOwnProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'onChange'
    >>;

export interface ITabsInheritedProps extends
    ITabsProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
