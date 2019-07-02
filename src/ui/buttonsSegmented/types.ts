export interface IButtonsSegmentedStateProps {
    active: number;
}

export interface IButtonsSegmentedDispatchProps {
    onChange: (index: number) => void;
}

export interface IButtonsSegmentedOwnProps {
    color?: 'black';
}

export interface IButtonsSegmentedProps extends
    IButtonsSegmentedStateProps,
    IButtonsSegmentedDispatchProps,
    IButtonsSegmentedOwnProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'color'
        | 'onChange'
    >>;

export interface IButtonsSegmentedInheritedProps extends
    IConflictFreeHTMLAttributes<HTMLElement>,
    IButtonsSegmentedProps
{}
