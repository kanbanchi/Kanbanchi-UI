export interface IButtonProps {
    color?:
        'black'
        | 'purple'
        | 'white';
    disabled?: boolean;
    href?: string;
    progress?: number; // percentage 0..100
    size?: 'large';
    text?: string;
    type?:
        'button'
        | 'submit';
    variant?:
        'action'
        | 'add'
        | 'fab'
        | 'icon'
        | 'icon-text'
        | 'primary'
        | 'secondary'
        | 'text';
}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.ButtonHTMLAttributes<E>, Exclude<keyof React.ButtonHTMLAttributes<E>,
        'color'
        | 'type'
    >>;

export interface IButtonInheritedProps extends
    IButtonProps,
    IConflictFreeHTMLAttributes<HTMLButtonElement>
{}
