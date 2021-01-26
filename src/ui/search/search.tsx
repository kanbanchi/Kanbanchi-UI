import * as React from 'react';
import { ISearchInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Select } from '../../ui';
import '../../../src/ui/search/search.module.scss';

// accessibility ok

export const Search: React.SFC<ISearchInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-search',
        className
    );

    return (
        <Select
            className={className}
            ref={ref as any}
            {...attributes}
        >
            {children}
        </Select>
    );
});

Search.defaultProps = {
    editable: true,
    type: 'search',
    variant: 'search',
    onChange: (): void => undefined,
    onEnter: () => undefined,
    onOpen: () => undefined
};

Search.displayName = 'Search';
