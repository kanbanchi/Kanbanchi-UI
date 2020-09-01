import * as React from 'react';
import { IDropdownInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/dropdown/dropdown.module.scss';

export const Dropdown: React.SFC<IDropdownInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        directionVertical,
        directionHorizontal,
        isFitWindow,
        isMountClosed,
        opened,
        portal,
        onDidMount,
        onDidUnmount,
        ...attributes
    } = props;

    if (!opened && !isMountClosed) return null;

    let [isShow, setIsShow] = React.useState(isMountClosed);

    className = ClassNames(
        'kui-dropdown',
        (directionVertical) ? 'kui-dropdown--direction_' + directionVertical : null,
        (directionHorizontal) ? 'kui-dropdown--direction_' + directionHorizontal : null,
        (opened) ? 'kui-dropdown--opened' : null,
        (portal) ? 'kui-dropdown--portal' : null,
        (isFitWindow) ? 'kui-dropdown--fit' : null,
        className
    );

    React.useEffect(() => {
        if (onDidMount) onDidMount();
        setIsShow(true);

        return () => {
            if (onDidUnmount) onDidUnmount();
        }
    }, []);

    return (
        <div
            className={className}
            {...attributes}
            style={{
                opacity: Number(isShow)
            }}
        >
            <div
                className="kui-dropdown__item"
                ref={ref as any}
            >
                {children}
            </div>
        </div>
    );
});

Dropdown.defaultProps = {
    directionVertical: 'auto',
    directionHorizontal: 'left',
    isMountClosed: true,
    opened: false
};

Dropdown.displayName = 'Dropdown';
