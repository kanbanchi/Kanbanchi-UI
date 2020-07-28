import * as React from 'react';
import { IButtonDropdownInheritedProps } from './types';
import { ClassNames, userAgentsInclude, getParentsClasses, SCREEN_PADDING, useCombinedRefs } from '../utils';
import { Dropdown } from '../../ui';
import '../../../src/ui/buttonDropdown/buttonDropdown.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { Portal, KUI_PORTAL_ID } from '../portal/portal';

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
        isMountClosed,
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
        if (!dropdownRef.current) return;

        dropdownContainerRef.current = dropdownRef.current.parentNode;
        const button = buttonRef.current.getBoundingClientRect();
        let portalRect: any = {
            bottom: window.innerHeight,
            left: 0,
            right: window.innerWidth,
            top: 0,
        };
        if (directionVertical === 'auto') {
            directionHook = (button.top > window.innerHeight * 2 / 3) ? 'up' : 'down';
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

            dropdownContainerRef.current.style.top = 'unset';
            dropdownContainerRef.current.style.bottom = 'unset';
            dropdownContainerRef.current.style.left = 'unset';
            dropdownContainerRef.current.style.right = 'unset';

            if (directionHorizontal === 'left') {
                dropdownContainerRef.current.style.left = button.left - portalRect.left + 'px';
            } else {
                dropdownContainerRef.current.style.right = portalRect.right - button.right + 'px';
            }

            if (directionHook === 'up') {
                dropdownContainerRef.current.style.bottom = portalRect.bottom - button.top + 'px';
            } else {
                dropdownContainerRef.current.style.top = button.bottom - portalRect.top + 'px';
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

    attributes.onBlur = (e: any) => {
        if (!document.hasFocus()) return;

        e.persist();
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
        setIsOpened(opened);
    }, [opened]);

    const dropdownElement = (<Dropdown
        className={classNameDropdown}
        directionVertical={directionHook}
        directionHorizontal={directionHorizontal}
        isFitWindow={isFitWindow}
        isMountClosed={isMountClosed}
        opened={isOpenedHook}
        portal={portal}
        ref={dropdownRef}
        tabIndex={-1}
        onAnimationEnd={dropdownAnimationEnd}
        onBlur={attributes.onBlur}
        onDidMount={calcDirection}
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
};

ButtonDropdown.displayName = 'ButtonDropdown';
