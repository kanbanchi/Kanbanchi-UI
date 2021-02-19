export interface ISwitchStateProps {
    checked: boolean;
}

export interface ISwitchDispatchProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ISwitchOwnProps {
    color?: 'black';
    direction?:
        'left' |
        'right';
}

export interface ISwitchProps extends
    ISwitchStateProps,
    ISwitchDispatchProps,
    ISwitchOwnProps
{}

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
