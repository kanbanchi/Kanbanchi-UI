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
        style,
        onAnimationEnd,
        onDidMount,
        onDidUnmount,
        ...attributes
    } = props;

    const classElement = 'kui-dropdown';
    const [isMount, setIsMount] = React.useState(opened);
    const [isTry, setTry] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false);
    const [isScroll, setScroll] = React.useState(false);
    const itemRef = React.useRef(null);

    const onAnimationEndHadler = (e: any) => {
        if (!opened) {
            setIsMount(false);
        } else {
            // itemRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'});
        }
        if (onAnimationEnd) onAnimationEnd(e);
    }

    React.useEffect(() => {
        if (opened) {
            setIsMount(true);

            setScroll(false);
            setTry(true);
            setTimeout(()=> {
                let scroll = 0;
                if (itemRef.current && itemRef.current.scrollHeight && itemRef.current.offsetHeight) {
                    scroll = itemRef.current.scrollHeight - itemRef.current.offsetHeight;
                    setScroll(scroll > 0);
                }
                setTry(false);
                setOpen(true);
                if (onDidMount) onDidMount(scroll);
            }, 0);
        } else {
            setOpen(false);
        }
    }, [opened]);

    React.useEffect(() => {
        return () => {
            if (onDidUnmount) onDidUnmount();
        }
    }, []);

    return (
        <div
            className={`
                ${classElement}
                ${directionVertical ? classElement + '--direction_' + directionVertical : ''}
                ${directionHorizontal ? classElement + '--direction_' + directionHorizontal : ''}
                ${isTry ? classElement + '--try' : ''}
                ${isOpen ? classElement + '--opened' : ''}
                ${portal ? classElement + '--portal' : ''}
                ${isFitWindow ? classElement + '--fit' : ''}
                ${isScaleAnimation ? classElement + '--scale' : ''}
                ${isScroll ? classElement + '--scroll' : ''}
                ${className}
            `}
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
                    style={style}
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
