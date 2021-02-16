export interface ICheckboxStateProps {
    checked?: boolean;
}

export interface ICheckboxDispatchProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ICheckboxOwnProps {
    color?:
        'black' |
        'light';
    direction?:
        'left' |
        'right';
    ['data-index']?: number;
}

export interface ICheckboxProps extends
    ICheckboxStateProps,
    ICheckboxDispatchProps,
    ICheckboxOwnProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.InputHTMLAttributes<E>, Exclude<keyof React.InputHTMLAttributes<E>,
        'color'
        | 'onChange'
    >>;

export interface ICheckboxInheritedProps extends
    IConflictFreeHTMLAttributes<HTMLInputElement>,
    ICheckboxProps
{}
