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
