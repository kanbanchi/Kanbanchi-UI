export type IDropdownDirectionVertical =
    'auto'
    | 'down'
    | 'up';

export interface IDropdownPublicProps {
    directionVertical?: IDropdownDirectionVertical;
    directionHorizontal?: 'left' | 'right';
    opened?: boolean;
}

export interface IDropdownProps extends
    IDropdownPublicProps
{
    ref?: any;
}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface IDropdownInheritedProps extends
    IDropdownProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
