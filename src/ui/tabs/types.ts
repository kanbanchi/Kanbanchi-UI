export interface ITabsStateProps {
    active: number;
}

export interface ITabsDispatchProps {
    onChange: (index: number) => void;
}

export interface ITabsProps extends
    ITabsStateProps,
    ITabsDispatchProps
{
    size?: 'large';
}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'onChange'
    >>;

export interface ITabsInheritedProps extends
    ITabsProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
