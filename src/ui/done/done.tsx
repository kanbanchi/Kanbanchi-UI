import * as React from 'react';
import { IDoneInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/done/done.module.scss';
import { Icon } from '../icon/icon';

// accessibility ok

export const Done: React.FC<IDoneInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        className,
        percent,
        size,
        titleDone,
        titleNotDone,
        titlePercent,
        ...attributes
    } = props;

    const isDone = percent && percent >= 100;

    className = ClassNames(
        'kui-done',
        (size) ? 'kui-done--size_' + size : null,
        (percent === null) ? 'kui-done--empty' : null,
        (isDone) ? 'kui-done--done' : null,
        className
    );

    const icon = (percent === null) ?
        'empty-circle' :
        null;

    let percentText = percent + '%' + (titlePercent && !isDone ? ' ' + titlePercent : '');
    if (percent === null) {
        percentText = titleNotDone;
    } else if (isDone && titleDone){
        percentText = titleDone;
    }

    return (
        <div
            className={className}
            ref={ref as any}
            {...attributes}
        >
            <div
                className={'kui-done__bg'}
                style={{
                    width: percent + '%'
                }}
            />
            <div
                className={'kui-done__items'}
            >
                {
                    !!icon &&
                    <Icon
                      className={'kui-done__icon'}
                      size={24}
                      xlink={icon}
                    />
                }
                <div
                    className={'kui-done__percent'}
                >
                    {percentText}
                </div>
            </div>
        </div>
    );
});

Done.defaultProps = {
    percent: null,
    size: 'large',
    titleDone: '',
    titleNotDone: 'Mark as done',
    titlePercent: 'done'
}

Done.displayName = 'Done';
