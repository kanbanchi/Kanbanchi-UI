import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import { Select } from '../../ui';
import '../../../src/ui/search/search.module.scss';

export const Search = (props) => {
    let {
        children,
        className,
        type,
        variants,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-search',
        className
    );

    if (!variants.includes('search')) variants.push('search');

    attributes.type = type || 'search';

    return (
        <Select
            className={className}
            variants={variants}
            {...attributes}
        >
            {children}
        </Select>
    );
};

Search.propTypes = {
    variants: PropTypes.arrayOf(PropTypes.string)
};

Search.defaultProps = {
    variants: []
};

export default Search;