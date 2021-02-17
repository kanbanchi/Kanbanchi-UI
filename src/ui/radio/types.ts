export interface IRadioStateProps {
    active?: number;
    direction?:
        'left' |
        'right';
}

export interface IRadioActiveProps {
    index?: number;
}

export interface IRadioDispatchProps {
    onChange: (event: React.SyntheticEvent<HTMLElement> & IRadioActiveProps) => void;
}

export interface IRadioProps extends
    IRadioStateProps,
    IRadioDispatchProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'onChange'
    >>;

export interface IRadioInheritedProps extends
    IRadioProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
