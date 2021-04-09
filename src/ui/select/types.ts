import { IDropdownPublicProps } from './../dropdown/types';
import { IInputPublicProps } from './../input/types';

export interface ISelectActiveProps {
    index?: number;
    value?: string;
    text?: string;
}

export interface ISelectActiveInheritedProps extends
    React.SyntheticEvent<HTMLElement>
{
    item: ISelectActiveProps;
}

export type ISelectOptionsObject = {[key: string]: string}
export type ISelectOptionsArray = Array<{
    active?: boolean;
    value: number | string;
    text?: string;
}>
export type ISelectOptions = ISelectOptionsObject | ISelectOptionsArray;

export interface ISelectStateProps {
    active?: number;
    options?: ISelectOptions;
}

export interface ISelectDispatchProps {
    onActiveChange?: (activeIndex: number) => void;
    onChange: (event: ISelectActiveInheritedProps) => void;
    onEnter?: (event: React.KeyboardEvent<HTMLElement>) => void;
    onOpen?: () => void;
    onClose?: () => void;
}

export interface ISelectOwnProps {
    editable?: boolean;
    isCloseOnEnter?: boolean;
    multiple?: boolean;
    ref?: any;
    single?: boolean; // for multiple: click on option name closes select
    isCloseOnClick?: boolean;
}

export interface ISelectProps extends
    ISelectStateProps,
    ISelectDispatchProps,
    ISelectOwnProps,
    IDropdownPublicProps,
    IInputPublicProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.InputHTMLAttributes<E>, Exclude<keyof React.InputHTMLAttributes<E>,
        'color' |
        'value' |
        'onChange'
    >>;

export interface ISelectInheritedProps extends
    ISelectProps,
    IConflictFreeHTMLAttributes<HTMLInputElement>
{}
