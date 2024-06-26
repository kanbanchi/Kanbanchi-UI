import { IDropdownDirectionVertical, IDropdownPublicProps } from './../dropdown/types';

export interface IButtonDropdownStateProps {
    disabled?: boolean;
    dontChangeFocus?: boolean;
    dropdownClassName?: string;
    isMoveToFit?: boolean;
    multiple?: boolean;
    portal?: boolean;
    portalId?: string;
    portalSelector?: string;
    single?: boolean; // for multiple: click on option name closes select
}

export interface IButtonDropdownDispatchProps {
    onOpen?: () => void;
    onClose?: () => void;
    onDirectionVerticalSet?: (directionVertical: IDropdownDirectionVertical) => void;
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
