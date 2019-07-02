export interface IFilesStateProps {
    disabled?: boolean;
    files?: Array<any>;
}

export interface IFilesDispatchProps {
}

export interface IFilesOwnProps {
    FileView?: any;
}

export interface IFilesProps extends
    IFilesStateProps,
    IFilesDispatchProps,
    IFilesOwnProps
{}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface IFilesInheritedProps extends
    IFilesProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
