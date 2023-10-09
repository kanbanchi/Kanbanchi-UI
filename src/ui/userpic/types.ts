import { ITooltipProps } from './../tooltip/types';

export interface IUserpicProps {
    background?: string;
    initials?: string;
    size?: 16 | 24 | 32 | 40;
    src?: string;
    tooltip?: string | ITooltipProps;
}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface IUserpicInheritedProps extends
    IUserpicProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
