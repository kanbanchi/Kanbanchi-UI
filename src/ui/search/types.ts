import { IDropdownPublicProps } from './../dropdown/types';
import { IInputPublicProps } from './../input/types';
import { ISelectDispatchProps, ISelectOwnProps } from './../select/types';

export interface ISearchProps extends
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

export interface ISearchInheritedProps extends
    ISearchProps,
    IConflictFreeHTMLAttributes<HTMLInputElement>
{}
