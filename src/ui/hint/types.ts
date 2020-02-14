import { ITooltipProps } from '../tooltip/types';

export interface IHintStateProps {
    arrow?:
        'down' |
        'left' |
        'right' |
        'up';
}

type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface IHintInheritedProps extends
    ITooltipProps,
    IHintStateProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
