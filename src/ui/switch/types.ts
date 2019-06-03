export interface ISwitchStateProps {
    checked: boolean;
}

export interface ISwitchDispatchProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ISwitchProps extends
    ISwitchStateProps,
    ISwitchDispatchProps
{
    color?: 'black';
}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.InputHTMLAttributes<E>, Exclude<keyof React.InputHTMLAttributes<E>,
        'checked'
        | 'color'
        | 'onChange'
    >>;

export interface ISwitchInheritedProps extends
    ISwitchProps,
    IConflictFreeHTMLAttributes<HTMLInputElement>
{}
