import { IDropdownPublicProps } from './../dropdown/types';

export interface IButtonDropdownProps extends
    IDropdownPublicProps
{
    disabled?: boolean;
}

export type IConflictFreeHTMLAttributes<E> = React.ButtonHTMLAttributes<E>;

export interface IButtonDropdownInheritedProps extends
    IButtonDropdownProps,
    IConflictFreeHTMLAttributes<HTMLButtonElement>
{}
