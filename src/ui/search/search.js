import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import './search.module.scss';

export const Search = (props) => {
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
        <div
            className={className}
            {...attributes}
        >
            {children}
        </div>
    );
};

Search.propTypes = {
    className: PropTypes.string
};

Search.defaultProps = {
    className: ''
};

export default Search;