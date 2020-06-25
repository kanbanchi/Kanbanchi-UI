import * as React from 'react';
import { IIconInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/icon/icon.module.scss';
import { Tooltip } from '..';

export const Icon: React.SFC<IIconInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        className,
        size,
        xlink,
        tooltip,
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

    const iconElement = <span
            className={classNames}
            ref={ref as any}
            {...attributes}
        >
            <Svg className="kui-icon__svg"/>
        </span>;

    if (tooltip) {
        const tooltipProps = (typeof tooltip === 'string')
            ? { value: tooltip }
            : tooltip;
        return (
            <Tooltip {...tooltipProps}>
                {iconElement}
            </Tooltip>
        )
    }

    return iconElement;
});

Icon.defaultProps = {
    xlink: '',
    size: 16
}

Icon.displayName = 'Icon';
