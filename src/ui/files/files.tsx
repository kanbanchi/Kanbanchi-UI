import * as React from 'react';
import { IFilesInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Button } from '..';
import '../../../src/ui/files/files.module.scss';

// accessibility ok

const DefaultFileView: React.SFC<any> = (props: any) => {
    const { iconUrl, title, ...attr } = props;
    return <div className={'kui-files-item'} tabIndex={0}>
        <span className="kui-files-item__col kui-files-item__col--icon">
            <img src={iconUrl} />
        </span>
        <span className="kui-files-item__col kui-files-item__col--title">
            <span className="kui-files-item__title">
                {title}
            </span>
        </span>
        <span className="kui-files-item__col kui-files-item__col--actions" />
    </div>
};

export const Files: React.SFC<IFilesInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        disabled,
        files,
        FileView,
        onClick,
        ...attributes
    } = props;

    className = ClassNames('kui-files', className);

    const fileList = files.map((file, index) => (
        <FileView
            key={index}
            {...file}
        />
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
                onClick={onClick}
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
    FileView: DefaultFileView,
    onClick: () => {}
};

Files.displayName = 'Files';
