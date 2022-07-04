import * as React from 'react';
import { ITagsInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/tags/tags.module.scss';

// accessibility ok

export const Tags: React.FC<ITagsInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-tags',
        className
    );

    return (
        <div
            className={className}
            ref={ref as any}
            {...attributes}
        >
            <div className={'kui-tags__inner'}>
                {children}
            </div>
        </div>
    );
});

Tags.defaultProps = {}

Tags.displayName = 'Tags';
