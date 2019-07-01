export interface IButtonsSegmentedStateProps {
    active: number;
    color?: 'black';
}

export interface IButtonsSegmentedDispatchProps {
    onChange: (index: number) => void;
}

export interface IButtonsSegmentedProps extends
    IButtonsSegmentedStateProps,
    IButtonsSegmentedDispatchProps
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
