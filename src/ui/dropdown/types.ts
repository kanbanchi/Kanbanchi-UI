export type IDropdownDirectionVertical =
    'auto'
    | 'down'
    | 'up';

export interface IDropdownPublicProps {
    directionVertical?: IDropdownDirectionVertical;
    directionHorizontal?: 'left' | 'right';
    dropdownClassName?: string;
    isFitWindow?: boolean;
    isScaleAnimation?: boolean;
    notBlurClasses?: string[];
    opened?: boolean;
    portal?: boolean;
    portalId?: string;
    portalSelector?: string;
    beforeOpen?: () => Promise<any>;
    onDidMount?: () => void;
    onDidUnmount?: () => void;
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
