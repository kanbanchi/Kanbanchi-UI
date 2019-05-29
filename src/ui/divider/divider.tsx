import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import '../../../src/ui/divider/divider.module.scss';

export const Divider = (props) => {
    let {
        className,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-divider',
        className
    );
    
    return (
        <hr className={className} {...attributes} />
    );
};

Divider.propTypes = {};

Divider.defaultProps = {};

export default Divider;