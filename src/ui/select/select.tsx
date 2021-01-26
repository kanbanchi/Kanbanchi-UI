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

// accessibility ok

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
        (multiple && single) ? 'kui-select--single' : null,
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

    const openDropdown = (isFocus = false) => {
        setIsOpenedHook(true);
        calcDirection();
        if (onOpen) onOpen();
        if (!editable || isFocus) {
            requestAnimationFrame(focusSelectedItem);
        }
        if (dropdownRef.current && multiple && single) {
            dropdownRef.current.removeEventListener('click', onDropdownClick);
            dropdownRef.current.addEventListener('click', onDropdownClick);
        }
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
        setUniqueClass(uuidv4());
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

    const focusSelectedItem = () => {
        const ariaSelected = dropdownRef.current && dropdownRef.current.querySelector('[tabindex]:not([tabindex="-1"])');
        if (ariaSelected) ariaSelected.focus();
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
            if (multiple) {
                if (onChange) onChange(e);
            } else {
                inputRef.current.setFocus(); // return focus to input before dropdown hide
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
            if (!classes.includes(uniqueClass)) {
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
                const li = multiple
                    ? (
                        <Checkbox
                            key={option.value}
                            checked={option.active}
                            color="light"
                            value={option.value}
                            onChange={() => null}
                        >
                            {option.text || option.value}
                        </Checkbox>
                    )
                    : (
                        <li key={option.value} value={option.value}>
                            {option.text || option.value}
                        </li>
                    );
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

    attributes.onKeyDown = (e: any) => {
        if (!e) return;
        if (onKeyDown) onKeyDown(e);
        if (e.key === 'Escape') {
            return closeDropdown();
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            if (!isOpenedHook) {
                openDropdown(true);
            } else {
                focusSelectedItem();
            }
            return;
        }
        if (e.key === 'Enter') {
            if (!isOpenedHook) {
                return openDropdown(true);
            }
            if (onEnter) onEnter(e);
            /**
             * сначала была задумка: пишешь в инпуте - в дропдауне подсвечивается подходящий айтем. похожим образом ведут себя системные селекты
             * но потом в канбане появился searchSelect, он больше похож на material
             */
            // if (activeHook === null) {
            //     findValue(e.target.value)
            //         .then((found: ISelectActiveProps) => {
            //             setActiveHook(found.index);
            //             onActiveChanged(found.index);
            //             if (onChange) onChange(Object.assign({}, e, {item: found}));
            //         })
            //         .catch(() => {
            //             setActiveHook(null);
            //         });
            // } else if (list[activeHook]) {
            //     if (
            //         onChange &&
            //         list[activeHook].props
            //     ) {
            //         onChange(Object.assign({}, e, {item: list[activeHook].props}));
            //     }
            //     onActiveChanged(activeHook);
            // }
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

    const onDropdownKeyDown = (e: React.KeyboardEvent) => {
        if (!e) return;
        if (
            e.key === 'Escape' ||
            multiple && single && e.key === 'Enter' // чекбоксы меняются пробелом, а на Enter нужно применить и закрыть дропдаун
        ) {
            inputRef.current.setFocus(); // return focus to input before dropdown hide
            closeDropdown();
        }
    }

    function onDropdownClick (e: React.SyntheticEvent) {
        const classes = getParentsClasses(
            e.target as HTMLElement,
            [SELECT_LIST_ITEM_CLASS, SELECT_LIST_CLASS]
        );
        if (classes.includes(SELECT_LIST_ITEM_CLASS)) {
            timer.current = setTimeout(closeDropdown, 100); // close after onChange
        }
    }

    React.useEffect(() => {
        onActiveChanged();
        if (dropdownRef.current) {
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
            key={uniqueClass}
            opened={isOpenedHook}
            ref={dropdownRef}
            tabIndex={-1}
            portal={portal}
            onAnimationEnd={dropdownAnimationEnd}
            onBlur={attributes.onBlur}
            onKeyDown={onDropdownKeyDown}
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
                aria-haspopup={true}
                aria-expanded={isOpenedHook}
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
    single: true,
    onChange: (): void => undefined,
    onEnter: () => undefined,
    onOpen: () => undefined,
    onClose: () => undefined
};

Select.displayName = 'Select';
