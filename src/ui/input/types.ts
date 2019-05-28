type IInputColor = 
    'grey';

type IInputVariant = 
    'arrow'
    | 'datepicker'
    | 'header'
    | 'priority'
    | 'search'
    | 'withicon';

export interface IInputStateProps {
    value?: string;
}

export interface IInputDispatchProps {
    onChange?: (event: React.SyntheticEvent<HTMLElement>) => void;
    onEnter?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export interface IInputPublicProps {
    autosize?: boolean;
    color?: IInputColor;
    disabled?: boolean;
    icon?: string;
    isClearable?: boolean;
    label?: string;
    variant?: IInputVariant;
}

export interface IInputProps extends
    IInputStateProps,
    IInputDispatchProps,
    IInputPublicProps
{}
