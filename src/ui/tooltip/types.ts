export interface ITooltipProps {
    direction?:
        'up'
        | 'up-left'
        | 'up-right'
        | 'left'
        | 'right'
        | 'down'
        | 'down-left'
        | 'down-right';
    value: string;
}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface ITooltipInheritedProps extends
    ITooltipProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
