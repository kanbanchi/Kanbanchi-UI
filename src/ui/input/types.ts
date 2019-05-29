export interface IInputStateProps {
    value?: string;
}

export interface IInputDispatchProps {
    onChange?: (event: React.SyntheticEvent<HTMLElement>) => void;
    onEnter?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export interface IInputPublicProps {
    autosize?: boolean;
    color?: 'grey';
    disabled?: boolean;
    icon?: string;
    isClearable?: boolean;
    label?: string;
    type?: string;
    variant?:
        'arrow'
        | 'datepicker'
        | 'header'
        | 'priority'
        | 'search'
        | 'withicon';
}

export interface IInputProps extends
    IInputStateProps,
    IInputDispatchProps,
    IInputPublicProps
{
    ref?: any;
}
