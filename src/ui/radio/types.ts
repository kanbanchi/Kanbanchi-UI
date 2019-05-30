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
