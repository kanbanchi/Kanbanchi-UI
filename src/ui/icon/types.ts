import { ITooltipProps } from '../tooltip/types';

export interface IIconProps {
    xlink: string;
    size?: 16 | 24 | 96;
    tooltip?: string | ITooltipProps;
}

export type IConflictFreeHTMLAttributes<E> = React.ImgHTMLAttributes<E>;

export interface IIconInheritedProps extends
    IIconProps,
    IConflictFreeHTMLAttributes<HTMLImageElement>
{}
