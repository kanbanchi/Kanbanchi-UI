import { IInputVariant } from './../types';

export interface IInputStateProps {
    value: string;
}

export interface IInputDispatchProps {
    onEnter: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export interface IInputProps extends
    IInputStateProps,
    IInputDispatchProps
{
    autosize?: boolean,
    color?: 'grey',
    disabled?: boolean,
    icon?: string,
    label?: string,
    variant?: IInputVariant
}
