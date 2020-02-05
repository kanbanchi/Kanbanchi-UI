import { IDropdownPublicProps } from './../dropdown/types';

export interface IButtonDropdownProps extends
    IDropdownPublicProps
{
    disabled?: boolean;
    dropdownClassName?: string;
    multiple?: boolean;
    portal?: boolean;
    portalId?: string;
    portalSelector?: string;
}

export type IConflictFreeHTMLAttributes<E> = React.ButtonHTMLAttributes<E>;

export interface IButtonDropdownInheritedProps extends
    IButtonDropdownProps,
    IConflictFreeHTMLAttributes<HTMLButtonElement>
{}
