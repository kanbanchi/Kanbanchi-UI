import * as React from 'react';
import { IUserpicInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Tooltip } from '../../ui';
import '../../../src/ui/userpic/userpic.module.scss';
import { Icon } from '../icon/icon';

export const Userpic: React.SFC<IUserpicInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        background,
        className,
        size,
        src,
        tooltip,
        ...attributesOriginal
    } = props,
        attributes: React.HTMLAttributes<HTMLElement> = attributesOriginal;

    className = ClassNames(
        'kui-userpic',
        (background) ? 'kui-userpic--background' : null,
        (size) ? 'kui-userpic--size_' + size : null,
        className
    );

    if (background) {
        if (!attributes.style) attributes.style = {};
        attributes.style.borderColor = background;
    }

    const userpicElement = (
        <div
            className={className}
            ref={ref as any}
            {...attributes}
        >
            {src ?
                <div
                    className={'kui-userpic__img'}
                    style={{backgroundImage: 'url(' + src + ')'}}
                /> :
                <Icon
                    className={'kui-userpic__ico'}
                    size={24}
                    xlink="user"
                />
            }
        </div>
    );

    if (tooltip) {
        const tooltipProps = (typeof tooltip === 'string')
            ? { value: tooltip }
            : tooltip;
        return (
            <Tooltip {...tooltipProps}>
                {userpicElement}
            </Tooltip>
        )
    }

    return userpicElement;
});

Userpic.defaultProps = {
    background: null,
    size: 24,
    src: null,
    tooltip: null,
}

Userpic.displayName = 'Userpic';
