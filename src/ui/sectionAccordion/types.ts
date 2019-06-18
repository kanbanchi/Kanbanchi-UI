import { IButtonInheritedProps } from './../button/types';

export interface ISectionAccordionStateProps {
    opened?: boolean;
}

export interface ISectionAccordionDispatchProps {
    onClose?: () => void;
    onOpen?: () => void;
}

export interface ISectionAccordionProps extends
    ISectionAccordionStateProps,
    ISectionAccordionDispatchProps
{
    Action?: React.SFC<IButtonInheritedProps>;
    color?: 'grey';
    icon?: string;
    title?: string;
}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'color'
    >>;

export interface ISectionAccordionInheritedProps extends
    ISectionAccordionProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
