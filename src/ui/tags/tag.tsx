import * as React from 'react';
import { ITagInheritedProps } from './types';
import { ClassNames, getParentsClasses } from '../utils';
import '../../../src/ui/tags/tags.module.scss';
import { Icon } from '../../ui';

export const Tag: React.SFC<ITagInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        clearIconTooltip,
        onClear,
        onClick,
        ...attributesOriginal
    } = props,
        attributes: React.HTMLAttributes<HTMLElement> = attributesOriginal,
        clickable = typeof onClick === 'function',
        clearable = typeof onClear === 'function';

    className = ClassNames(
        'kui-tag',
        (clickable) ? 'kui-tag--clickable' : null,
        (clearable) ? 'kui-tag--clearable' : null,
        className
    );

    if (clickable) {
        attributes.onClick = (event: React.MouseEvent) => {
            const classes = getParentsClasses(event.target as HTMLElement, ['kui-tag__clear', 'kui-tag']);
            if (classes.includes('kui-tag__clear')) {
                if (clearable) onClear(event);
                return;
            }
            onClick(event);
        }
    }

    return (
        <div
            className={className}
            ref={ref as any}
            {...attributes}
        >
            <span className={'kui-tag__text'}>
                {children}
            </span>
            {clearable &&
                <Icon
                    xlink="clear"
                    size={24}
                    tooltip={clearIconTooltip}
                    className="kui-tag__clear"
                />
            }
        </div>
    );
});

Tag.defaultProps = {
    onClear: null,
    onClick: null
}

Tag.displayName = 'Tag';
