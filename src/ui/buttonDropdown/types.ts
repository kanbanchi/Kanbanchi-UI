import { IDropdownPublicProps } from './../dropdown/types';

export interface IButtonDropdownStateProps {
    disabled?: boolean;
    dropdownClassName?: string;
    multiple?: boolean;
    portal?: boolean;
    portalId?: string;
    portalSelector?: string;
}

export interface IButtonDropdownDispatchProps {
    onOpen?: () => void;
    onClose?: () => void;
}

export interface IButtonDropdownProps extends
    IDropdownPublicProps,
    IButtonDropdownStateProps,
    IButtonDropdownDispatchProps
{}

export type IConflictFreeHTMLAttributes<E> = React.ButtonHTMLAttributes<E>;

export interface IButtonDropdownInheritedProps extends
    IButtonDropdownProps,
    IConflictFreeHTMLAttributes<HTMLButtonElement>
{}
