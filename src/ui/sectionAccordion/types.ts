import { IButtonInheritedProps } from './../button/types';
import { ReactChild } from 'react';

export interface ISectionAccordionStateProps {
    opened?: boolean;
}

export interface ISectionAccordionDispatchProps {
    onClose?: () => void;
    onOpen?: () => void;
}

export interface ISectionAccordionOwnProps {
    Action?: React.SFC<IButtonInheritedProps>;
    color?: 'grey';
    icon?: string;
    title?: ReactChild;
    variant?: 'simple';
}

export interface ISectionAccordionProps extends
    ISectionAccordionStateProps,
    ISectionAccordionDispatchProps,
    ISectionAccordionOwnProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'color'
        | 'title'
    >>;

export interface ISectionAccordionInheritedProps extends
    ISectionAccordionProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
