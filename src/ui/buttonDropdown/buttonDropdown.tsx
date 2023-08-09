import * as React from 'react';
import { IButtonDropdownInheritedProps } from './types';
import { ClassNames, getParentsClasses, SCREEN_PADDING, useCombinedRefs } from '../utils';
import { Dropdown } from '../../ui';
import '../../../src/ui/buttonDropdown/buttonDropdown.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { Portal, KUI_PORTAL_ID } from '../portal/portal';
import { SELECT_LIST_ITEM_CLASS } from '../selectListItem/selectListItem';
import { SELECT_LIST_CLASS } from '../selectList/selectList';

// accessibility ok

export const ButtonDropdown = React.forwardRef((
    props: IButtonDropdownInheritedProps,
    ref
) => {
    let {
        children,
        className,
        directionVertical,
        directionHorizontal,
        disabled,
        dontChangeFocus,
        dropdownClassName,
        isFitWindow,
        isScaleAnimation,
        multiple,
        notBlurClasses,
        opened,
        portal,
        portalId,
        portalSelector,
        single,
        beforeOpen,
        onBlur,
        onClick,
        onOpen,
        onClose,
        ...attributesOriginal
    } = props,
        attributes: React.ButtonHTMLAttributes<HTMLButtonElement> = attributesOriginal,
        btn: JSX.Element = null,
        list: JSX.Element[] = null;

    let [directionHook, setDirectionHook] = React.useState(directionVertical);
    let [isOpenedHook, setIsOpenedHook] = React.useState(opened);
    const [uniqueClass] = React.useState('kui-button-dropdown--' + uuidv4());
    const _buttonRef = React.useRef(null);
    const buttonRef =  useCombinedRefs(ref, _buttonRef);
    const buttonButtonRef =  React.useRef(null);
    const dropdownRef = React.useRef(null);
    const dropdownUniqueClass = 'kui-button-dropdown__dropdown--' + uniqueClass;
    const timer = React.useRef(null);

    className = ClassNames(
        'kui-button-dropdown',
        uniqueClass,
        (disabled) ? 'kui-button-dropdown--disabled' : null,
        (isOpenedHook) ? 'kui-button-dropdown--opened' : null,
        (portal) ? 'kui-button-dropdown--portal' : null,
        (multiple && single) ? 'kui-button-dropdown--single' : null,
        className
    );

    const classNameDropdown = ClassNames(
        'kui-button-dropdown__dropdown',
        (dropdownClassName) ? dropdownClassName : null,
        dropdownUniqueClass
    );

    const calcDirection = () => {
        const button = buttonRef.current.getBoundingClientRect();
        let portalRect: any = {
            bottom: window.innerHeight,
            left: 0,
            right: window.innerWidth,
            top: 0,
        };
        if (directionVertical === 'auto') {
            directionHook = (button.top > window.innerHeight * 1 / 2) ? 'up' : 'down';
            setDirectionHook(directionHook);
        }
        if (portal) {
            const portalEl = document.getElementById(portalId) as HTMLElement;
            if (portalEl) {
                const portalStyle = window.getComputedStyle(portalEl);
                if (
                    !isNaN(parseInt(portalStyle.top)) ||
                    !isNaN(parseInt(portalStyle.left))
                ) {
                    portalRect = portalEl.getBoundingClientRect();
                }
            }

            dropdownRef.current.style.top = 'unset';
            dropdownRef.current.style.bottom = 'unset';
            dropdownRef.current.style.left = 'unset';
            dropdownRef.current.style.right = 'unset';

            if (directionHorizontal === 'left') {
                dropdownRef.current.style.left = button.left - portalRect.left + 'px';
            } else {
                dropdownRef.current.style.right = portalRect.right - button.right + 'px';
            }

            if (directionHook === 'up') {
                dropdownRef.current.style.bottom = portalRect.bottom - button.top + 'px';
            } else {
                dropdownRef.current.style.top = button.bottom - portalRect.top + 'px';
            }
        }
        if (portal || isFitWindow) requestAnimationFrame(() => { // wait dropdownItem
            const maxHeight = directionHook === 'up'
                ? button.top
                : window.innerHeight - button.bottom;
            const dropdownItem = dropdownRef.current.children[0];
            if (dropdownItem) dropdownItem.style.maxHeight = Math.round(maxHeight - SCREEN_PADDING * 2) + 'px';
        })
    }

    const onDropdownMount = () => {
        if (!dropdownRef.current) return;

        calcDirection();

        if (multiple && single) {
            dropdownRef.current.removeEventListener('click', onDropdownClick);
            dropdownRef.current.addEventListener('click', onDropdownClick);
        }
    }

    const afterOpened = (isOpened: boolean) => {
        isOpenedHook = isOpened;
        setIsOpenedHook(isOpenedHook);
        if (isOpened) {
            if (onOpen) onOpen();
        } else if (isOpened === false) {
            if (onClose) onClose();
            setTimeout(() => {
                const activeElement = document.activeElement;
                if (
                    activeElement.tagName === 'INPUT' ||
                    activeElement.tagName === 'BUTTON' ||
                    activeElement.tagName === 'TEXTAREA' ||
                    [...activeElement.attributes].find(attr => attr.name.startsWith('aria-'))
                ) {
                    // dont move focus, if it catched by another control
                } else if (buttonButtonRef.current) buttonButtonRef.current.focus(); // вернуть фокус кнопке
            });
        }
    }

    const setIsOpened = (isOpened: boolean) => {
        if (isOpened === isOpenedHook) return;

        if (isOpened && beforeOpen) {
            beforeOpen().then(() => afterOpened(isOpened));
        } else {
            afterOpened(isOpened)
        }
    }

    attributes.onClick = (e) => {
        if (!(disabled && isOpenedHook)) {
            setIsOpened(!isOpenedHook);
        }
        if (onClick) onClick(e);
    }

    notBlurClasses = [
        ...notBlurClasses,
        uniqueClass,
        dropdownUniqueClass,
    ];

    attributes.onBlur = (e: any) => {
        if (!document.hasFocus()) return;

        const classes = getParentsClasses(
            e.relatedTarget as HTMLElement,
            notBlurClasses
        );
        for (let i = 0; i<notBlurClasses.length; i++) {
            if (classes.includes(notBlurClasses[i])) {
                return;
            }
        }

        setIsOpened(false);
        if (onBlur) onBlur(e);
    }

    attributes.onKeyDown = (e: React.KeyboardEvent) => {
        if (!e) return;
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            const ariaSelected = dropdownRef.current.querySelector('[tabindex]:not([tabindex="-1"])');
            if (ariaSelected) ariaSelected.focus();
        }
    }

    const onChange = (e: any) => {
        if (!multiple) {
            setIsOpened(false);
        }
        if (attributes.onChange) attributes.onChange(e);
    }

    let childrenArray: Array<{}> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    list = React.Children.map(childrenArray, (child: any) => {
        if (!child || !child.props) return null;
        if (child.type.displayName === 'Button') {
            attributes.className = ClassNames(
                'kui-button-dropdown__item',
                child.props.className
            ),
            btn = React.cloneElement(child, {
                ['aria-haspopup']: true,
                ['aria-expanded']: isOpenedHook,
                ...attributes,
                ref: buttonButtonRef
            });
            return null;
        }
        if (child.type.displayName !== 'SelectList') return child;
        return React.cloneElement(child, {
            onChange
        });
    });

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!e) return;
        if (
            e.key === 'Escape' ||
            multiple && single && e.key === 'Enter' // чекбоксы меняются пробелом, а на Enter нужно применить и закрыть дропдаун
        ) {
            e.stopPropagation();
            return setIsOpened(false);
        }
    }

    React.useEffect(() => {
        setIsOpened(opened);
    }, [opened]);

    function onDropdownClick (e: React.SyntheticEvent) {
        const classes = getParentsClasses(
            e.target as HTMLElement,
            [SELECT_LIST_ITEM_CLASS, SELECT_LIST_CLASS]
        );
        if (classes.includes(SELECT_LIST_ITEM_CLASS)) {
            timer.current = setTimeout(() => setIsOpened(false), 100); // close after onChange
        }
    }

    React.useEffect(() => {
        const dropdownRefCurrent = dropdownRef.current;
        return () => {
            if (dropdownRefCurrent) dropdownRefCurrent.removeEventListener('click', onDropdownClick);
            if (timer.current) clearTimeout(timer.current);
        }
    }, []);

    const dropdownElement = (<Dropdown
        className={classNameDropdown}
        directionVertical={directionHook}
        directionHorizontal={directionHorizontal}
        isFitWindow={isFitWindow}
        isScaleAnimation={isScaleAnimation}
        opened={isOpenedHook}
        portal={portal}
        ref={dropdownRef}
        tabIndex={-1}
        onBlur={attributes.onBlur}
        onDidMount={onDropdownMount}
        onKeyDown={onKeyDown}
    >
        {list}
    </Dropdown>);

    const dropdownPortal = portal
        ? <Portal
            id={portalId}
            selector={portalSelector}
        >
            {dropdownElement}
        </Portal>
        : dropdownElement;

    return (
        <div className={className} ref={buttonRef}>
            {btn}
            {dropdownPortal}
        </div>
    );
});

ButtonDropdown.defaultProps = {
    directionVertical: 'auto',
    directionHorizontal: 'left',
    disabled: false,
    notBlurClasses: [],
    portalId: KUI_PORTAL_ID,
    single: true,
};

ButtonDropdown.displayName = 'ButtonDropdown';
