export interface ICheckboxStateProps {
    checked?: boolean;
    color?: 'black';
}

export interface ICheckboxDispatchProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ICheckboxProps extends
    ICheckboxStateProps,
    ICheckboxDispatchProps
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
