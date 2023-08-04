import * as React from 'react';
import { IDropdownInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/dropdown/dropdown.module.scss';

// accessibility ok

export const Dropdown = React.forwardRef((
    props: IDropdownInheritedProps,
    ref
) => {
    let {
        children,
        className,
        directionVertical,
        directionHorizontal,
        isFitWindow,
        isScaleAnimation,
        opened,
        portal,
        onAnimationEnd,
        onDidMount,
        onDidUnmount,
        ...attributes
    } = props;

    const [isMount, setIsMount] = React.useState(opened);
    const itemRef = React.useRef(null);

    className = ClassNames(
        'kui-dropdown',
        (directionVertical) ? 'kui-dropdown--direction_' + directionVertical : null,
        (directionHorizontal) ? 'kui-dropdown--direction_' + directionHorizontal : null,
        (opened) ? 'kui-dropdown--opened' : null,
        (portal) ? 'kui-dropdown--portal' : null,
        (isFitWindow) ? 'kui-dropdown--fit' : null,
        (isScaleAnimation) ? 'kui-dropdown--scale' : null,
        className
    );

    const onAnimationEndHadler = (e: any) => {
        if (!opened) {
            setIsMount(false);
        } else {
            itemRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'});
        }
        if (onAnimationEnd) onAnimationEnd(e);
    }

    React.useEffect(() => {
        if (opened) {
            setIsMount(true);
            if (onDidMount) onDidMount();
        }
    }, [opened]);

    React.useEffect(() => {
        return () => {
            if (onDidUnmount) onDidUnmount();
        }
    }, []);

    return (
        <div
            className={className}
            onAnimationEnd={onAnimationEndHadler}
            ref={ref}
            {...attributes}
        >
            {isMount &&
                <div
                    className="kui-dropdown__item"
                    ref={itemRef}
                    aria-live={'assertive'}
                    role={'alert'}
                >
                    {children}
                </div>
            }
        </div>
    );
});

Dropdown.defaultProps = {
    directionVertical: 'auto',
    directionHorizontal: 'left',
    opened: false
};

Dropdown.displayName = 'Dropdown';
