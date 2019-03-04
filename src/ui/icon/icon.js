import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import styles from './icon.module.scss';

export const Icon = (props) => {
    let {
        className,
        size,
        xlink,
        ...attributes
    } = props;

    let Svg;    
    try {    
        Svg = require('svg-react-loader!../../assets/icons/' + xlink + '.svg'); // small
    } catch (e) {
        try {    
            Svg = require('svg-react-loader!../../assets/icons/big/' + xlink + '.svg'); // big 96px
        } catch (e) {
            Svg = 'svg';
        }
    }

    className = ClassNames(
        styles['kui-icon'],
        styles['kui-icon--' + size],
        className
    );
    
    return (
        <span
            className={className}
            {...attributes}
        >
            <Svg className={styles['kui-icon__svg']} />
        </span>
    );
};

Icon.propTypes = {
    xlink: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf([
        16, 
        24, 
        96
    ]),
};

Icon.defaultProps = {
    xlink: '',
    className: '',
    size: 16
};

export default Icon;