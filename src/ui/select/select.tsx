import * as React from 'react';
import { ISelectInheritedProps, ISelectActiveProps } from './types';
import { IDropdownDirectionVertical } from './../dropdown/types';
import { ClassNames } from '../utils';
import { Input, Dropdown } from '../../ui';
import '../../../src/ui/select/select.module.scss';

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
        editable,
        opened,
        variant,
        onBlur,
        onChange,
        onClick,
        onEnter,
        onFocus,
        onKeyUp,
        onOpen,
        ...attributesOriginal
    } = props,
        attributes: React.InputHTMLAttributes<HTMLElement> = attributesOriginal,
        dropdownBody = null,
        list: Array<React.ReactElement> = [],
        isSearch = variant === 'search';

    const [activeHook, setActiveHook] = React.useState(active);
    const [directionHook, setDirectionHook] = React.useState(directionVertical);
    const [initialValue, setInitialValue] = React.useState('');
    const [valueHook, setValueHook] = React.useState('');
    const [isFocusedHook, setIsFocusedHook] = React.useState(opened);
    const [isOpenedHook, setIsOpenedHook] = React.useState(opened);
    const [itemsRefsHook, setItemsRefsHook] = React.useState([]); // list items for auto scroll in dropdown

    const dropdownRef = React.useRef(null);
    const inputRef = React.useRef(null);
    const selectRef = React.useRef(null);

    className = ClassNames(
        'kui-select',
        (disabled) ? 'kui-select--disabled' : null,
        (isOpenedHook) ? 'kui-select--opened' : null,
        (variant) ? 'kui-select--variant_' + variant : null,
        className
    );

    const onSelectListInit = (refs: Array<{}>) => {
        setItemsRefsHook(refs);
    }

    const openDropdown = () => {
        setIsOpenedHook(true);
        calcDirection();
        if (onOpen) onOpen();
    }

    const calcDirection = () => {
        if (directionVertical !== 'auto') return;
        let el = selectRef.current.getBoundingClientRect();
        let dir: IDropdownDirectionVertical = (el.top > window.innerHeight * 2 / 3) ? 'up' : 'down';
        setDirectionHook(dir);
    }

    const dropdownAnimationEnd = () => {
        if (isOpenedHook) {
            onActiveChanged();
            dropdownRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'});
        }
    }

    const onActiveChanged = () => {
        if (isFocusedHook
            && itemsRefsHook[activeHook]
            && itemsRefsHook[activeHook].current)
        {
            let lines = Math.floor(dropdownRef.current.offsetHeight / itemsRefsHook[activeHook].current.offsetHeight);
            let center = Math.floor(lines / 2) * itemsRefsHook[activeHook].current.offsetHeight;
            dropdownRef.current.scrollTop = itemsRefsHook[activeHook].current.offsetTop - center; // centered active item
        }
    }

    const setValue = (value: string) => {
        setValueHook(value);
        inputRef.current.setIsFilled(value);
    }

    attributes.onChange = (e: any) => {
        if (e.item) { // list item clicked
            setIsOpenedHook(false);
            setActiveHook(e.item.index);
            if (isSearch) { // dont update search input value
                if (onChange) onChange(e);
            } else if (e.item.text !== valueHook) {
                setValue(e.item.text);
                if (onChange) onChange(e);
            }
        }
    }

    attributes.onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setTimeout(() => {
            if (!isFocusedHook) {
                setIsFocusedHook(true);
                openDropdown();
            }
        }, 100); // delay after onClick
        if (onFocus) onFocus(e);
    }

    attributes.onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (isFocusedHook) {
            setIsFocusedHook(false);
            setIsOpenedHook(false);
        }
        if (onBlur) onBlur(e);
    }

    attributes.onClick = (e: React.MouseEvent<HTMLInputElement>) => {
        if (isFocusedHook) {
            if (!isOpenedHook) {
                openDropdown();
            } else {
                setIsOpenedHook(!isOpenedHook);
            }
            if (e) e.stopPropagation();
        }
        if (onClick) onClick(e);
    }

    let childrenArray: Array<{}> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    dropdownBody = React.Children.map(childrenArray, (child: any) => {
        if (child.type.displayName !== 'SelectList') return child;
        list = child.props.children;
        return React.cloneElement(child, {
            active: activeHook,
            onChange: attributes.onChange,
            onSelectListInit
        });
    });

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

    attributes.onKeyUp = (e: any) => {
        if (!e) return;
        if (onKeyUp) onKeyUp(e);
        e.persist();
        findValue(e.target.value)
            .then((found: ISelectActiveProps) => {
                if (!isOpenedHook && e.which !== 13) { // open if closed
                    openDropdown();
                }
                if (!isSearch) {
                    if (e.which === 39 || e.which === 13) { // arrow right || enter
                        setValue(found.text);
                    }
                    if (onChange) onChange(Object.assign({}, e, {item: found}));
                }
            })
            .catch(() => {
                setActiveHook(null);
                if (!isOpenedHook && e.which !== 13) { // open if closed
                    openDropdown();
                }
            })
            .then(() => { // dont know why it works only in then
                if (e.which === 27) { // esc
                    setValueHook(initialValue + ' '); // doesnt reset to initialValue without it
                    setIsOpenedHook(false);
                    setActiveHook(active);
                    setValue(initialValue);
                }
            });
    }

    const onEnterHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        if (!isSearch) {
            setIsOpenedHook(false);
        }
        if (onEnter) onEnter(e);
    }

    React.useEffect(() => {
        if (active !== null && list.length) {
            setInitialValue(list[active].props.children);
            setValue(list[active].props.children);
        }
    }, []);

    React.useEffect(() => {
        onActiveChanged();
    }, [activeHook]);

    return (
        <div className={className} ref={selectRef}>
            <Input
                autosize={false}
                color={color as any}
                readOnly={!editable}
                ref={inputRef}
                value={valueHook as any}
                variant={variant}
                onEnter={onEnterHandler}
                {...attributes}
            />
            <Dropdown
                directionVertical={directionHook}
                directionHorizontal={directionHorizontal}
                opened={isOpenedHook}
                ref={dropdownRef}
                onAnimationEnd={dropdownAnimationEnd}
            >
                {dropdownBody}
            </Dropdown>
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
    opened: false,
    onChange: (): void => undefined,
    onEnter: () => undefined,
    onOpen: () => undefined
};

Select.displayName = 'Select';
