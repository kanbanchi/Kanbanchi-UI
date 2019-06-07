export interface ISectionAccordionStateProps {
    opened?: boolean;
}

export interface ISectionAccordionDispatchProps {
    onClick: () => void;
    onOpen?: () => void;
}

export interface ISectionAccordionProps extends
    ISectionAccordionStateProps,
    ISectionAccordionDispatchProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'onClick'
    >>;

export interface ISectionAccordionInheritedProps extends
    ISectionAccordionProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
