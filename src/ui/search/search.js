import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import { Select } from '../../ui';
import '../../../src/ui/search/search.module.scss';

export const Search = (props) => {
    let {
        children,
        className,
        type,
        variant,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-search',
        className
    );

    attributes.variant = variant || 'search';

    attributes.type = type || 'search';

    return (
        <Select
            className={className}
            {...attributes}
        >
            {children}
        </Select>
    );
};

Search.propTypes = {
    variant: PropTypes.oneOf([
        'arrow',
        'header',
        'datepicker',
        'search',
        'withicon'
    ])
};

Search.defaultProps = {
    variant: null
};

export default Search;