export interface IButtonProps {
    color?:
        'black'
        | 'purple'
        | 'white';
    disabled?: boolean;
    href?: string;
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
