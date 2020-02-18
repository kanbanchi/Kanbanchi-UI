import { ITooltipProps } from '../tooltip/types';

export interface IHintStateProps {
}

type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface IHintInheritedProps extends
    ITooltipProps,
    IHintStateProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
