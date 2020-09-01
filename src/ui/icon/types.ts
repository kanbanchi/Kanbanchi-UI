export interface IIconProps {
    xlink: string;
    size?: EIconSize;
}

export enum EIconSize {
    SIZE_16 = 16,
    SIZE_24 = 24,
    SIZE_96 = 96
}

export type IConflictFreeHTMLAttributes<E> = React.ImgHTMLAttributes<E>;

export interface IIconInheritedProps extends
    IIconProps,
    IConflictFreeHTMLAttributes<HTMLImageElement>
{}
