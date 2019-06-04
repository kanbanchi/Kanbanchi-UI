import * as React from 'react';
import { IIconInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/icon/icon.module.scss';

export const Icon: React.SFC<IIconInheritedProps> =
(props) => {
    let {
        className,
        size,
        xlink,
        ...attributes
    } = props;

    let Svg;
    try {
        Svg = require('!svg-react-loader!../../../src/assets/icons/' + xlink + '.svg'); // small
    } catch (e) {
        try {
            Svg = require('!svg-react-loader!../../../src/assets/icons/big/' + xlink + '.svg'); // big 96px
        } catch (e) {
            Svg = 'svg';
        }
    }

    if (size === 16) size = null;

    const classNames = ClassNames(
        'kui-icon',
        (size) ? 'kui-icon--' + size : null,
        className
    );

    return (
        <span className={classNames} {...attributes} >
            <Svg className="kui-icon__svg"/>
        </span>
    );
}

Icon.defaultProps = {
    xlink: '',
    size: 16
}

Icon.displayName = 'Icon';
