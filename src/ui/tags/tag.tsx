import * as React from 'react';
import { ITagInheritedProps } from './types';
import { ClassNames, getParentsClasses } from '../utils';
import '../../../src/ui/tags/tags.module.scss';
import { Button, Icon } from '../../ui';

export const Tag: React.FC<ITagInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        iconTooltip,
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

    const getButtonClear = () => {
        const tooltip = typeof iconTooltip === 'string'
            ? { value: iconTooltip }
            : iconTooltip;

        return (
            <Button
                className={'kui-tag__clear'}
                variant={'icon'}
                tooltip={tooltip}
                aria-label={tooltip.value}
            >
                <Icon
                    xlink={'clear'}
                    size={24}
                />
            </Button>
        );
    };

    return (
        <div
            className={className}
            ref={ref as any}
            tabIndex={0}
            {...attributes}
        >
            <span className={'kui-tag__text'}>
                {children}
            </span>
            {clearable &&
                getButtonClear()
            }
        </div>
    );
});

Tag.defaultProps = {
    onClear: null,
    onClick: null,
    iconTooltip: 'Remove'
}

Tag.displayName = 'Tag';
