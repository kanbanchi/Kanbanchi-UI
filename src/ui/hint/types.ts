import { ITooltipProps } from '../tooltip/types';

export interface IHintStateProps {
}

type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'translate'
    >>;

export interface IHintInheritedProps extends
    ITooltipProps,
    IHintStateProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
