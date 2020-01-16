import * as React from 'react';
import { IButtonsSegmentedInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/buttonsSegmented/buttonsSegmented.module.scss';

export const ButtonsSegmented: React.SFC<IButtonsSegmentedInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        active,
        children,
        className,
        color,
        onChange,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-buttons_segmented',
        (color) ? 'kui-buttons_segmented--color_' + color : null,
        className
    );

    let childrenArray: Array<{}> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    const buttonHocs = React.Children.map(childrenArray, (child: any, i) => {
        if (!child || !child.props) return null;
        return React.cloneElement(child, {
            className: ClassNames(
                'kui-buttons_segmented__item',
                (child.props.className) ? child.props.className : null,
                (i === active) ? 'kui-buttons_segmented__item--active' : null
            ),
            onClick: (e) => {
                if (onChange) onChange(i);
                if (child.props.onClick) child.props.onClick(e);
            }
        });
    });

    return (
        <div
            className={className}
            ref={ref as any}
            {...attributes}
        >
            {buttonHocs}
        </div>
    );
});

ButtonsSegmented.defaultProps = {
    active: 0,
    color: null,
    onChange: (): void => undefined
};

ButtonsSegmented.displayName = 'ButtonsSegmented';
