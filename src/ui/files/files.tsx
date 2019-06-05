import * as React from 'react';
import { IFilesInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Button } from '..';
import '../../../src/ui/files/files.module.scss';

const DefaultFileView: React.SFC<any> = (props: any) => (
    <div className={'kui-files-item'}>
        <span className="kui-files-item__col kui-files-item__col--icon">
            <img src={props.file.iconUrl} />
        </span>
        <span className="kui-files-item__col kui-files-item__col--title">
            <span className="kui-files-item__title">
                {props.file.title}
            </span>
        </span>
        <span className="kui-files-item__col kui-files-item__col--actions" />
    </div>
);

export const Files: React.SFC<IFilesInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        disabled,
        files,
        FileView,
        ...attributes
    } = props;

    className = ClassNames('kui-files', className);

    const fileList = files.map((file, index) => (
        <FileView file={file} key={index} />
    ));

    return (
        <div
            className={className}
            ref={ref as any}
            {...attributes}
        >
            <Button
                disabled={disabled}
                variant="add"
            >
                {children}
            </Button>
            {fileList}
        </div>
    );
});

Files.defaultProps = {
    disabled: false,
    files: [],
    FileView: DefaultFileView
};

Files.displayName = 'Files';
