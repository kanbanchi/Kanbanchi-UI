export interface IFilesStateProps {
    files?: Array<any>;
}

export interface IFilesDispatchProps {
}

export interface IFilesProps extends
    IFilesStateProps,
    IFilesDispatchProps
{
    disabled?: boolean;
    view?: any;
}

export type IConflictFreeHTMLAttributes<E> = React.HTMLAttributes<E>;

export interface IFilesInheritedProps extends
    IFilesProps,
    IConflictFreeHTMLAttributes<HTMLElement>
{}
