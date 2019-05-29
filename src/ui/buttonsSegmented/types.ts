export interface IButtonsSegmentedStateProps {
    active: number;
}

export interface IButtonsSegmentedDispatchProps {
    onChange: (index: number) => void;
}

export interface IButtonsSegmentedProps extends
    IButtonsSegmentedStateProps,
    IButtonsSegmentedDispatchProps 
{
    color?: 'black';
}
