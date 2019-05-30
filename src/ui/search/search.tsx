import * as React from 'react';
import { ISearchProps } from './types';
import { ClassNames } from '../utils';
import { Select } from '../../ui';
import '../../../src/ui/search/search.module.scss';

export const Search: React.SFC<
    ISearchProps
    & React.HTMLAttributes<HTMLElement>
> = (props) => {
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
            {...attributes}
        >
            {children}
        </Select>
    );
};

Search.defaultProps = {
    editable: true,
    type: 'search',
    variant: 'search',
    onChange: (): void => undefined,
    onEnter: () => undefined,
    onOpen: () => undefined
};

Search.displayName = 'Search';
