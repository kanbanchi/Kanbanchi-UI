import * as React from 'react';
import { IButtonDropdownInheritedProps } from './types';
import { IDropdownDirectionVertical } from './../dropdown/types';
import { ClassNames, userAgentsInclude, ClassesList } from '../utils';
import { Dropdown } from '../../ui';
import '../../../src/ui/buttonDropdown/buttonDropdown.module.scss';

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
    const buttonRef = React.useRef(null);
    const dropdownRef = React.useRef(null);

    className = ClassNames(
        'kui-button-dropdown',
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
        if (
            multiple &&
            e.relatedTarget
        ) {
            const classes = ClassesList(
                e.relatedTarget as HTMLElement,
                ['kui-dropdown', 'kui-button-dropdown']
            );
            if (classes.includes('kui-dropdown')) {
                if (e.target) {
                    e.target.focus();
                }
                return;
            }
        }
        setTimeoutHook(setTimeout(() => {
            setIsOpenedHook(false);
        }, 200)); // delay after onClick
        if (onBlur) onBlur(e);
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
            onChange: attributes.onChange
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
                tabIndex={0}
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
