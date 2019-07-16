export interface IFilesStateProps {
    disabled?: boolean;
    files?: Array<any>;
}

export interface IFilesDispatchProps {
    onClick: () => void;
}

export interface IFilesOwnProps {
    FileView?: any;
}

export interface IFilesProps extends
    IFilesStateProps,
    IFilesDispatchProps,
    IFilesOwnProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'onClick'
    >>;

export interface IFilesInheritedProps extends
    IFilesProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
