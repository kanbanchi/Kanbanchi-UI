export type IDropdownDirectionVertical =
    'auto'
    | 'down'
    | 'up';

export interface IDropdownPublicProps {
    directionVertical?: IDropdownDirectionVertical;
    directionHorizontal?: 'left' | 'right';
    opened?: boolean;
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
