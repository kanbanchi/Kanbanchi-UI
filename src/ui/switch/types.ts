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
