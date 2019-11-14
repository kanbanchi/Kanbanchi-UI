import * as React from 'react';
import { IButtonDropdownInheritedProps } from './types';
import { IDropdownDirectionVertical } from './../dropdown/types';
import { ClassNames, userAgentsInclude, getParentsClasses } from '../utils';
import { Dropdown } from '../../ui';
import '../../../src/ui/buttonDropdown/buttonDropdown.module.scss';
import { v4 as uuidv4 } from 'uuid';

export const ButtonDropdown: React.SFC<IButtonDropdownInheritedProps> =
(props) => {
    let {
        children,
        className,
        directionVertical,
        directionHorizontal,
        disabled,
        multiple,
        opened,
        onBlur,
        onClick,
        ...attributesOriginal
    } = props,
        attributes: React.ButtonHTMLAttributes<HTMLButtonElement> = attributesOriginal,
        btn = null,
        list = null;

    const [directionHook, setDirectionHook] = React.useState(directionVertical);
    const [isOpenedHook, setIsOpenedHook] = React.useState(opened);
    const [timeoutHook, setTimeoutHook] = React.useState(null);
    const [uniqueClass, setUniqueClass] = React.useState('kui-button-dropdown--' + uuidv4());
    const buttonRef = React.useRef(null);
    const dropdownRef = React.useRef(null);

    className = ClassNames(
        'kui-button-dropdown',
        uniqueClass,
        (disabled) ? 'kui-button-dropdown--disabled' : null,
        (isOpenedHook) ? 'kui-button-dropdown--opened' : null,
        className
    );

    const calcDirection = () => {
        if (directionVertical !== 'auto') return;
        let el = buttonRef.current.getBoundingClientRect();
        let dir: IDropdownDirectionVertical = (el.top > window.innerHeight * 2 / 3) ? 'up' : 'down';
        setDirectionHook(dir);
    }

    const dropdownAnimationEnd = () => {
        if (
            isOpenedHook
            && !userAgentsInclude(['edge', 'safari'])
        ) {
            dropdownRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'});
        }
    }

    attributes.onClick = (e) => {
        let isOpened = isOpenedHook;
        setIsOpenedHook(!isOpenedHook);
        if (!isOpened) {
            calcDirection();
        }
        if (onClick) onClick(e);
    }

    attributes.onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.persist();
        const classes = getParentsClasses(
            e.relatedTarget as HTMLElement,
            [uniqueClass]
        );
        if (classes.includes(uniqueClass)) {
            if (multiple && e.target) {
                e.target.focus({ preventScroll: true });
            }
        } else {
            setIsOpenedHook(false);
            if (onBlur) onBlur(e);
        }
    }

    const onChange = (e: any) => {
        if (!multiple) setIsOpenedHook(false);
        if (attributes.onChange) attributes.onChange(e);
    }

    let childrenArray: Array<{}> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    list = React.Children.map(childrenArray, (child: any) => {
        if (child.type.displayName === 'Button') {
            attributes.className = ClassNames(
                'kui-button-dropdown__item',
                child.props.className
            ),
            btn = React.cloneElement(child, attributes);
            return null;
        }
        if (child.type.displayName !== 'SelectList') return child;
        return React.cloneElement(child, {
            onChange
        });
    });

    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutHook);
        };
    }, [timeoutHook]);

    return (
        <div className={className} ref={buttonRef}>
            {btn}
            <Dropdown
                className="kui-button-dropdown__dropdown"
                directionVertical={directionHook}
                directionHorizontal={directionHorizontal}
                opened={isOpenedHook}
                ref={dropdownRef}
                tabIndex={-1}
                onAnimationEnd={dropdownAnimationEnd}
            >
                {list}
            </Dropdown>
        </div>
    );
};

ButtonDropdown.defaultProps = {
    directionVertical: 'auto',
    directionHorizontal: 'left',
    disabled: false
};

ButtonDropdown.displayName = 'ButtonDropdown';
