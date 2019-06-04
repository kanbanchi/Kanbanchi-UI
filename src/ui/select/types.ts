import { IDropdownPublicProps } from './../dropdown/types';
import { IInputPublicProps } from './../input/types';

export interface ISelectActiveProps {
    index?: number;
    value?: string;
    text?: string;
}

export interface ISelectStateProps {
    active?: number;
}

export interface ISelectDispatchProps {
    onChange: (event: React.SyntheticEvent<HTMLElement> & ISelectActiveProps) => void;
    onEnter?: (event: React.KeyboardEvent<HTMLElement>) => void;
    onOpen?: () => void;
}

export interface ISelectProps extends
    ISelectStateProps,
    ISelectDispatchProps,
    IDropdownPublicProps,
    IInputPublicProps
{
    editable?: boolean;
    ref?: any;
}
