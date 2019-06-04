export interface IRadioStateProps {
    active?: number;
}

export interface IRadioActiveProps {
    index?: number;
}

export interface IRadioDispatchProps {
    onChange: (event: React.SyntheticEvent<HTMLElement> & IRadioActiveProps) => void;
}

export interface IRadioProps extends
    IRadioStateProps,
    IRadioActiveProps
{}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface IRadioInheritedProps extends
    IRadioProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
