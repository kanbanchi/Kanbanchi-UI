import * as React from 'react';
import { ISearchInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Select } from '../../ui';
import '../../../src/ui/search/search.module.scss';

// accessibility ok

export const Search: React.FC<ISearchInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        dropdownClassName,
        isDropdownUplifted,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-search',
        className,
        (isDropdownUplifted) ? 'kui-search--uplifted' : null
    );

    return (
        <Select
            className={className}
            dropdownClassName={`
                kui-search__dropdown
                ${isDropdownUplifted ? 'kui-search__dropdown--uplifted' : ''}
                ${dropdownClassName ? dropdownClassName : ''}
            `}
            ref={ref as any}
            isDropdownUplifted={isDropdownUplifted}
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
