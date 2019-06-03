export interface ICheckboxStateProps {
    checked?: boolean;
}

export interface ICheckboxDispatchProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ICheckboxProps extends
    ICheckboxStateProps,
    ICheckboxDispatchProps
{
    color?: 'black';
}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.InputHTMLAttributes<E>, Exclude<keyof React.InputHTMLAttributes<E>,
        'color'
        | 'onChange'
    >>;

export interface ICheckboxInheritedProps extends
    ICheckboxProps,
    IConflictFreeHTMLAttributes<HTMLInputElement>
{}
