import * as React from 'react';
import { IButtonDropdownInheritedProps } from './types';
import { ClassNames, userAgentsInclude, getParentsClasses, getParentsScrollTop, SCREEN_PADDING, useCombinedRefs } from '../utils';
import { Dropdown } from '../../ui';
import '../../../src/ui/buttonDropdown/buttonDropdown.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { Portal } from '../portal/portal';

export const ButtonDropdown: React.SFC<IButtonDropdownInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        directionVertical,
        directionHorizontal,
        disabled,
        dropdownClassName,
        isFitWindow,
        multiple,
        notBlurClasses,
        opened,
        portal,
        portalId,
        portalSelector,
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
    const [uniqueClass, setUniqueClass] = React.useState('kui-button-dropdown--' + uuidv4());
    const _buttonRef = React.useRef(null);
    const buttonRef =  useCombinedRefs(ref, _buttonRef);
    const buttonButtonRef =  React.useRef(null);
    const dropdownRef = React.useRef(null);
    const dropdownContainerRef = React.useRef(null);
    const dropdownUniqueClass = 'kui-button-dropdown__dropdown--' + uniqueClass;

    className = ClassNames(
        'kui-button-dropdown',
        uniqueClass,
        (disabled) ? 'kui-button-dropdown--disabled' : null,
        (isOpenedHook) ? 'kui-button-dropdown--opened' : null,
        (portal) ? 'kui-button-dropdown--portal' : null,
        className
    );

    const classNameDropdown = ClassNames(
        'kui-button-dropdown__dropdown',
        (dropdownClassName) ? dropdownClassName : null,
        dropdownUniqueClass
    );

    const calcDirection = () => {
        const button = buttonRef.current.getBoundingClientRect();
        if (directionVertical === 'auto') {
            directionHook = (button.top > window.innerHeight * 2 / 3) ? 'up' : 'down';
            setDirectionHook(directionHook);
        }
        if (portal) {
            const portalEl = portalSelector
                ? document.querySelector(portalSelector) as HTMLElement
                : document.body;
            const portalScrollTop = getParentsScrollTop(portalEl);

            dropdownContainerRef.current.style.top = 'unset';
            dropdownContainerRef.current.style.bottom = 'unset';
            dropdownContainerRef.current.style.left = 'unset';
            dropdownContainerRef.current.style.right = 'unset';

            if (directionHorizontal === 'left') {
                dropdownContainerRef.current.style.left = button.left + 'px';
            } else {
                dropdownContainerRef.current.style.right = (window.innerWidth - button.right) + 'px';
            }

            if (directionHook === 'up') {
                dropdownContainerRef.current.style.bottom = (window.innerHeight - button.top) + 'px';
            } else {
                dropdownContainerRef.current.style.top = portalScrollTop + button.bottom + 'px';
            }
        }
        if (portal || isFitWindow) {
            const maxHeight = directionHook === 'up'
                ? button.top
                : window.innerHeight - button.bottom;
            dropdownRef.current.style.maxHeight = Math.round(maxHeight - SCREEN_PADDING * 2) + 'px';
        }
    }

    const dropdownAnimationEnd = () => {
        if (
            isOpenedHook
            && !userAgentsInclude(['edge', 'safari'])
        ) {
            dropdownRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'});
        }
    }

    const afterOpened = (isOpened: boolean) => {
        isOpenedHook = isOpened;
        setIsOpenedHook(isOpenedHook);
        calcDirection();
        if (isOpened && onOpen) {
            onOpen();
        } else if (isOpened === false && onClose) {
            onClose();
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

    React.useEffect(() => {
        function onBlurHandler (e: any) {
            const classes = getParentsClasses(
                e.relatedTarget as HTMLElement,
                notBlurClasses
            );
            for (let i = 0; i<notBlurClasses.length; i++) {
                if (classes.includes(notBlurClasses[i])) return;
            }

            setIsOpened(false);
            if (onBlur) onBlur(e);
        };
        if (buttonButtonRef.current) buttonButtonRef.current.removeEventListener('blur', onBlurHandler);
        if (dropdownRef.current) dropdownRef.current.removeEventListener('blur', onBlurHandler);
        if (isOpenedHook) { // если дропдаун открыт
            if (buttonButtonRef.current) buttonButtonRef.current.addEventListener('blur', onBlurHandler);
            if (dropdownRef.current) dropdownRef.current.addEventListener('blur', onBlurHandler);
        }

        return () => {
            if (buttonButtonRef.current)  buttonButtonRef.current.removeEventListener('blur', onBlurHandler);
            if (dropdownRef.current) dropdownRef.current.removeEventListener('blur', onBlurHandler);
        }
    }, [isOpenedHook]);

    React.useEffect(() => {
        setIsOpened(opened);
    }, [opened]);

    React.useEffect(() => {
        dropdownContainerRef.current = dropdownRef.current.parentNode;
    }, []);

    const dropdownElement = (<Dropdown
        className={classNameDropdown}
        directionVertical={directionHook}
        directionHorizontal={directionHorizontal}
        isFitWindow={isFitWindow}
        opened={isOpenedHook}
        portal={portal}
        ref={dropdownRef}
        tabIndex={-1}
        onAnimationEnd={dropdownAnimationEnd}
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
    notBlurClasses: []
};

ButtonDropdown.displayName = 'ButtonDropdown';
