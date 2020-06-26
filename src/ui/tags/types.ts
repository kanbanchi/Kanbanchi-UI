/**
 * Tags
 */
import { ITooltipProps } from '../tooltip/types';

export interface ITagsProps {}

export type ITagsConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface ITagsInheritedProps extends
    ITagsProps,
    ITagsConflictFreeHTMLAttributes<HTMLElement>
{}

/**
 * Tag
 */
export interface ITagStateProps {
    iconTooltip?: string | ITooltipProps;
}

export interface ITagDispatchProps {
    onClear?: (event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
}

export interface ITagProps extends
    ITagStateProps,
    ITagDispatchProps
{}

export type ITagConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'onClick'
    >>;

export interface ITagInheritedProps extends
    ITagProps,
    ITagConflictFreeHTMLAttributes<HTMLElement>
{}
