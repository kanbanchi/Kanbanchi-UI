import { IDropdownPublicProps } from './../dropdown/types';
import { IInputPublicProps } from './../input/types';
import { ISelectDispatchProps } from './../select/types';

export interface ISearchProps extends
    ISelectDispatchProps,
    IDropdownPublicProps,
    IInputPublicProps
{
    editable?: boolean;
}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.InputHTMLAttributes<E>, Exclude<keyof React.InputHTMLAttributes<E>,
        'color'
        | 'onChange'
    >>;

export interface ISearchInheritedProps extends
    ISearchProps,
    IConflictFreeHTMLAttributes<HTMLInputElement>
{}
