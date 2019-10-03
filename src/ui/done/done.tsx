import * as React from 'react';
import { IDoneInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/done/done.module.scss';
import { Icon } from '../icon/icon';

export const Done: React.SFC<IDoneInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        className,
        percent,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-done',
        (percent === null) ? 'kui-done--empty' : null,
        (percent && percent > 50) ? 'kui-done--inverse' : null,
        (percent && percent >= 100) ? 'kui-done--done' : null,
        className
    );

    const icon = (percent === null) ?
        'radio-button-off' :
        'done';

    let percentText = percent + '%';
    if (!percent || percent >= 100) percentText = 'Done';

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
                <Icon
                    className={'kui-done__icon'}
                    size={24}
                    xlink={icon}
                />
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
}

Done.displayName = 'Done';
