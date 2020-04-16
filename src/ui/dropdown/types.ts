export type IDropdownDirectionVertical =
    'auto'
    | 'down'
    | 'up';

export interface IDropdownPublicProps {
    directionVertical?: IDropdownDirectionVertical;
    directionHorizontal?: 'left' | 'right';
    dropdownClassName?: string;
    notBlurClasses?: string[];
    opened?: boolean;
    portal?: boolean;
    portalId?: string;
    portalSelector?: string;
}

export interface IDropdownOwnProps {
    ref?: any;
}

export interface IDropdownProps extends
    IDropdownPublicProps,
    IDropdownOwnProps
{}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface IDropdownInheritedProps extends
    IDropdownProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
