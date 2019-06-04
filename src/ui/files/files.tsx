import * as React from 'react';
import { IFilesInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Button } from '..';
import '../../../src/ui/files/files.module.scss';

export const Files: React.SFC<IFilesInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        disabled,
        files,
        view,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-files',
        className
    );

    const defaultView = (props: any) => (
        <div
            className={'kui-files-item'}
        >
            <span className="
                kui-files-item__col
                kui-files-item__col--icon
            ">
                <img src={props.file.iconUrl}/>
            </span>
            <span className="
                kui-files-item__col
                kui-files-item__col--title
            ">
                <span className="kui-files-item__title">
                    {props.file.title}
                </span>
            </span>
            <span className="
                kui-files-item__col
                kui-files-item__col--actions
            ">
            </span>
        </div>
    );

    const View = view || defaultView;

    const fileList = files.map((file, index) => (
        <View
            file={file}
            key={index}
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
    view: null
};

Files.displayName = 'Files';
