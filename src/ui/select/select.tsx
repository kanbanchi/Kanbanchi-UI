import * as React from 'react';
import { ISelectInheritedProps, ISelectActiveProps, ISelectOptionsObject } from './types';
import { ClassNames, userAgentsInclude, getParentsClasses, getParentsScrollTop, SCREEN_PADDING, useCombinedRefs, ClassList } from '../utils';
import { Input, Dropdown, SelectList } from '../../ui';
import '../../../src/ui/select/select.module.scss';
import { Checkbox } from '../checkbox/checkbox';
import { ISelectListInheritedProps } from '../selectList/types';
import { v4 as uuidv4 } from 'uuid';
import { SELECT_LIST_ITEM_CLASS } from '../selectListItem/selectListItem';
import { SELECT_LIST_CLASS } from '../selectList/selectList';
import { Portal } from '../portal/portal';

export const Select: React.SFC<ISelectInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        active,
        children,
        className,
        color,
        directionVertical,
        directionHorizontal,
        disabled,
        dropdownClassName,
        editable,
        isCloseOnEnter,
        isFitWindow,
        multiple,
        opened,
        options,
        portal,
        portalId,
        portalSelector,
        readOnly,
        single,
        variant,
        onActiveChange,
        onBlur,
        onChange,
        onClick,
        onEnter,
        onFocus,
        onKeyDown,
        onOpen,
        onClose,
        ...attributesOriginal
    } = props,
        attributes: React.InputHTMLAttributes<HTMLElement> = attributesOriginal,
        dropdownBody = null,
        list: Array<React.ReactElement> = [],
        isSearch = variant === 'search';

    const WAIT_ANIMATION = 300;
    let [activeHook, _setActiveHook] = React.useState(active);
    let [directionHook, setDirectionHook] = React.useState(directionVertical);
    let [initialValue, _setInitialValue] = React.useState('');
    const [valueHook, setValueHook] = React.useState('');
    const [isFocusedHook, setIsFocusedHook] = React.useState(opened);
    const [isOpenedHook, setIsOpenedHook] = React.useState(opened);
    const [itemsRefsHook, setItemsRefsHook] = React.useState([]); // list items for auto scroll in dropdown
    const [uniqueClass, setUniqueClass] = React.useState('kui-select--' + uuidv4());

    const dropdownRef = React.useRef(null);
    const dropdownContainerRef = React.useRef(null);
    const inputRef = React.useRef(null);
    const selectRef = React.useRef(null);
    const combinedRef =  useCombinedRefs(ref, selectRef);
    const timer = React.useRef(null);

    className = ClassNames(
        'kui-select',
        uniqueClass,
        (disabled) ? 'kui-select--disabled' : null,
        (isOpenedHook) ? 'kui-select--opened' : null,
        (variant) ? 'kui-select--variant_' + variant : null,
        (single) ? 'kui-select--single' : null,
        (readOnly) ? 'kui-select--readonly' : null,
        className
    );

    const setActiveHook = (activeIndex: number) => {
        activeHook = activeIndex;
        _setActiveHook(activeIndex);
    }

    const setInitialValue = (value: string) => {
        initialValue = value;
        _setInitialValue(value);
    }

    const onSelectListInit = (refs: Array<{}>) => {
        setItemsRefsHook(refs);
    }

    const openDropdown = () => {
        setIsOpenedHook(true);
        calcDirection();
        if (onOpen) onOpen();
    }

    const closeDropdown = () => {
        setIsOpenedHook(false);
        if (
            !multiple &&
            valueHook !== initialValue
        ) {
            setActiveHook(active);
            setValue(initialValue);
        }
        if (onClose) onClose();
    }

    const calcDirection = () => {
        if (!dropdownRef.current) return;

        let el = combinedRef.current.getBoundingClientRect();
        if (directionVertical === 'auto') {
            directionHook = (el.top > window.innerHeight * 2 / 3) ? 'up' : 'down';
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
                dropdownContainerRef.current.style.left = el.left + 'px';
            } else {
                dropdownContainerRef.current.style.right = (window.innerWidth - el.right) + 'px';
            }

            if (directionHook === 'up') {
                dropdownContainerRef.current.style.bottom = (window.innerHeight - el.top) + 'px';
            } else {
                dropdownContainerRef.current.style.top = portalScrollTop + el.bottom + 'px';
            }
        }
        if (portal || isFitWindow) {
            const maxHeight = directionHook === 'up'
                ? el.top
                : window.innerHeight - el.bottom;
            dropdownRef.current.style.maxHeight = Math.round(maxHeight - SCREEN_PADDING * 2) + 'px';
        }
    }

    const dropdownAnimationEnd = () => {
        if (
            dropdownRef.current &&
            isOpenedHook &&
            !userAgentsInclude(['edge', 'safari'])
        ) {
            scrollList();
            dropdownRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'});
        }
    }

    const scrollList = () => {
        if (
            dropdownRef.current &&
            isFocusedHook &&
            itemsRefsHook[activeHook] &&
            itemsRefsHook[activeHook].current)
        {
            let lines = Math.floor(dropdownRef.current.offsetHeight / itemsRefsHook[activeHook].current.offsetHeight);
            let center = Math.floor(lines / 2) * itemsRefsHook[activeHook].current.offsetHeight;
            dropdownRef.current.scrollTop = itemsRefsHook[activeHook].current.offsetTop - center; // centered active item
        }
    }

    const setValue = (value: string) => {
        setValueHook(value);
    }

    attributes.onChange = (e: any) => {
        if (e.item) { // list item clicked
            inputRef.current.setFocus(); // return focus to input before dropdown hide
            if (multiple) {
                if (onChange) onChange(e);
            } else {
                setIsOpenedHook(false);
                if (!isSearch) { // dont update search input value
                    setValue(e.item.text);
                }
                if (e.item.index !== activeHook) {
                    setActiveHook(e.item.index);
                }
                if (onChange) onChange(e);
            }
        } else { // input changed
            setValue(e.target.value);
            if (onChange) onChange(e);
        }
    }

    attributes.onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        timer.current = setTimeout(() => {
            if (!isFocusedHook) {
                setIsFocusedHook(true);
                openDropdown();
            }
        }, 100); // delay after onClick
        if (onFocus) onFocus(e);
    }

    attributes.onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!document.hasFocus()) return;

        e.persist();
        if (isFocusedHook) {
            const classes = getParentsClasses(
                e.relatedTarget as HTMLElement,
                [uniqueClass]
            );
            if (classes.includes(uniqueClass)) {
                if (e.target) {
                    e.target.focus({ preventScroll: true });
                }
            } else {
                setIsFocusedHook(false);
                closeDropdown();
                if (onBlur) onBlur(e);
            }
        }
    }

    attributes.onClick = (e: React.MouseEvent<HTMLInputElement>) => {
        if (isFocusedHook) {
            if (!isOpenedHook) {
                openDropdown();
            } else {
                setIsOpenedHook(!isOpenedHook);
            }
        }
        if (onClick) onClick(e);
    }

    const attributesSelectList: ISelectListInheritedProps = {
        active: activeHook,
        onChange: attributes.onChange,
        onSelectListInit
    };

    if (multiple) {
        attributesSelectList.fixActive = false;
    }

    if (children) {
        let childrenArray: Array<{}> = // children could be string, we need array
            (Array.isArray(children)) ? children : [children];

        dropdownBody = React.Children.map(childrenArray, (child: any) => {
            if (
                !child ||
                !child.type ||
                !child.type.displayName ||
                child.type.displayName !== 'SelectList'
            ) return child;
            list = React.Children.map(child.props.children, (child: React.ReactElement) => {
                if (!child || !child.props) return null;
                const classList = ClassList(child.props.className);
                const disabled = classList.includes('disabled');
                return React.cloneElement(child, {
                    disabled
                });
            });

            return React.cloneElement(child, attributesSelectList);
        });
    } else if (options) {
        if (Array.isArray(options)) {
            list = options.map(option => {
                let li = null;
                if (multiple) {
                    li = (
                        <Checkbox
                            key={option.value}
                            checked={option.active}
                            color="light"
                            value={option.value}
                            onChange={() => null}
                        >
                            {option.text || option.value}
                        </Checkbox>
                    );
                } else {
                    li = (
                        <li key={option.value} value={option.value}>
                            {option.text || option.value}
                        </li>
                    );
                }
                return li;
            });
        } else {
            const optionsObj = options as ISelectOptionsObject;
            list = Object.keys(optionsObj).map(value => (
                <li key={value} value={value}>
                    {optionsObj[value]}
                </li>
            ));
        }
        dropdownBody = (
            <SelectList {...attributesSelectList}>
                {list}
            </SelectList>
        );
    }

    const findValue = (value: string) => {
        return new Promise(function(resolve, reject) {
            if (!value || !list || !list.length) {
                reject();
                return;
            }
            let val = value.toLowerCase();
            React.Children.forEach(list, (child: React.ReactElement, index) => {
                let item = child.props.children.toLowerCase();
                if ((item === val) || item.includes(val)) {
                    resolve({
                        index,
                        value: child.props.value,
                        text: child.props.children
                    });
                }
            });
            reject();
        });
    }

    const highlightOptionIndex = (
        direction: number
    ): number => {
        let activeNew;
        activeHook = activeHook === null ? -1 : activeHook;
        activeNew = activeHook + direction;
        if (
            direction < 0 &&
            activeNew < 0
        ) {
            activeNew = list.length - 1;
        } else if (
            direction > 0 &&
            activeNew >= list.length
        ) {
            activeNew = 0;
        }

        while (
            list[activeNew].props.disabled &&
            list.filter(option => !option.props.disabled).length &&
            activeNew !== activeHook
        ) {
            activeNew += direction;
            if (
                direction < 0 &&
                activeNew < 0
            ) {
                activeNew = list.length - 1;
            } else if (
                direction > 0 &&
                activeNew >= list.length
            ) {
                activeNew = 0;
            }
        }

        return activeNew;
    }

    attributes.onKeyDown = (e: any) => {
        if (!e) return;
        if (onKeyDown) onKeyDown(e);
        e.persist();
        if (e.which === 27) { // esc
            return closeDropdown();
        } else if (
            e.which === 38 || // arrow up
            e.which === 40 // arrow down
        ) {
            let activeNew;
            if (e.which === 38) {
                activeNew = highlightOptionIndex(-1);
            } else if (e.which === 40) {
                activeNew = highlightOptionIndex(1);
            }
            setActiveHook(activeNew);
            if (
                !isSearch &&
                list[activeNew].props &&
                list[activeNew].props.children
            ) {
                setValue(list[activeNew].props.children);
            }
            return;
        }
        if (!isOpenedHook) return openDropdown();
        if (e.which === 13) { // enter
            if (onEnter) onEnter(e);
            if (activeHook === null) {
                findValue(e.target.value)
                    .then((found: ISelectActiveProps) => {
                        setActiveHook(found.index);
                        onActiveChanged(found.index);
                        if (onChange) onChange(Object.assign({}, e, {item: found}));
                    })
                    .catch(() => {
                        setActiveHook(null);
                    });
            } else {
                if (
                    onChange &&
                    list[activeHook].props
                ) {
                    onChange(Object.assign({}, e, {item: list[activeHook].props}));
                }
                onActiveChanged(activeHook);
            }
            if (!multiple && isCloseOnEnter) {
                closeDropdown();
            }
        }
    }

    const onActiveChanged = (activeNew: number = null) => {
        if (activeNew === null) activeNew = active;
        if (
            activeNew === null ||
            !list.length ||
            !list[activeNew]
        ) return;

        if (
            list[activeNew].props &&
            list[activeNew].props.children
        ) {
            setInitialValue(list[activeNew].props.children);
            setValue(list[activeNew].props.children);
        }
    }

    React.useEffect(() => {
        function onDropdownClick (e: React.SyntheticEvent) {
            const classes = getParentsClasses(
                e.target as HTMLElement,
                [SELECT_LIST_ITEM_CLASS, SELECT_LIST_CLASS]
            );
            if (classes.includes(SELECT_LIST_ITEM_CLASS)) {
                timer.current = setTimeout(closeDropdown, 100); // close after onChange
            }
        }

        onActiveChanged();
        if (dropdownRef.current) {
            if (multiple && single) {
                dropdownRef.current.addEventListener('click', onDropdownClick);
            }
            dropdownContainerRef.current = dropdownRef.current.parentNode;
        }
        if (isOpenedHook) {
            timer.current = setTimeout(() => {
                calcDirection();
            }, WAIT_ANIMATION);
        }

        return () => {
            if (dropdownRef.current) dropdownRef.current.removeEventListener('click', onDropdownClick);
            if (timer.current) clearTimeout(timer.current);
        }
    }, []);

    React.useEffect(() => {
        scrollList();
        if (onActiveChange) onActiveChange(activeHook);
    }, [activeHook]);

    React.useEffect(() => {
        setActiveHook(active);
        if (!multiple) {
            onActiveChanged();
        }
    }, [active, options]);

    const classNameDropdown = ClassNames(
        'kui-select__dropdown',
        dropdownClassName
    );

    const dropdownElement = dropdownBody
        ? <Dropdown
            className={classNameDropdown}
            directionVertical={directionHook}
            directionHorizontal={directionHorizontal}
            isFitWindow={isFitWindow}
            opened={isOpenedHook}
            ref={dropdownRef}
            tabIndex={-1}
            portal={portal}
            onAnimationEnd={dropdownAnimationEnd}
        >
            {dropdownBody}
        </Dropdown>
        : null;

    const dropdownPortal = readOnly || disabled
        ? null
        : portal
            ? <Portal
                id={portalId}
                selector={portalSelector}
            >
                {dropdownElement}
            </Portal>
            : dropdownElement;

    return (
        <div className={className} ref={combinedRef}>
            <Input
                autosize={false}
                color={color as any}
                disabled={disabled}
                readOnly={readOnly || !editable}
                ref={inputRef}
                value={valueHook as any}
                variant={variant}
                {...attributes}
            />
            {dropdownPortal}
        </div>
    );
});

Select.defaultProps = {
    active: null,
    color: null,
    directionVertical: 'auto',
    directionHorizontal: 'left',
    disabled: false,
    editable: false,
    isCloseOnEnter: true,
    multiple: false,
    opened: false,
    options: null,
    single: false,
    onChange: (): void => undefined,
    onEnter: () => undefined,
    onOpen: () => undefined,
    onClose: () => undefined
};

Select.displayName = 'Select';
