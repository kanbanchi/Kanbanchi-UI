export interface IIconProps {
    xlink: string;
    size?: 16 | 24 | 96;
}

export type IConflictFreeHTMLAttributes<E> = React.ImgHTMLAttributes<E>;

export interface IIconInheritedProps extends
    IIconProps,
    IConflictFreeHTMLAttributes<HTMLImageElement>
{}
