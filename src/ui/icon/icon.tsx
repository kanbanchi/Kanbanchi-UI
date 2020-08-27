import * as React from 'react';
import { EIconSize, IIconInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/icon/icon.module.scss';

export const Icon: React.FC<IIconInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        className,
        size,
        xlink,
        ...attributes
    } = props;

    let Svg;
    try {
        if (size && (size === EIconSize.SIZE_16 || size === EIconSize.SIZE_96)) {
            try {
                Svg = require(`!svg-react-loader!../../../src/assets/icons/${ size }/` + xlink + '.svg');
            } catch (e) {
                size = EIconSize.SIZE_24;
                Svg = require(`!svg-react-loader!../../../src/assets/icons/${ size }/` + xlink + '.svg');
            }
        }
    } catch (e) {
        Svg = 'svg';
        console.error(`svg with xlink ${ xlink }, size ${ size } not found`)
    }

    if (size === 16) size = null;

    const classNames = ClassNames(
        'kui-icon',
        (size) ? 'kui-icon--' + size : null,
        className
    );

    return (
        <span
            className={classNames}
            ref={ref as any}
            {...attributes}
        >
            <Svg className="kui-icon__svg"/>
        </span>
    );
});

Icon.defaultProps = {
    xlink: '',
    size: EIconSize.SIZE_16
}

Icon.displayName = 'Icon';
