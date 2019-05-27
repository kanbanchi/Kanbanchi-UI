import React, { useState, useEffect, useRef } from 'react';
import { PropTypes, ClassNames } from '../utils';
import { Input, Dropdown } from '../../ui';
import '../../../src/ui/select/select.module.scss';

export const Select = (props) => {
    let {
        active,
        children,
        className,
        direction,
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
        ...attributes
    } = props,
        dropdownBody = null,
        list = [],
        isSearch = variant === 'search';

    const [activeHook, setActiveHook] = useState(active);
    const [directionHook, setDirectionHook] = useState(direction);
    const [initialValue, setInitialValue] = useState('');
    const [valueHook, setValueHook] = useState('');
    const [isFocusedHook, setIsFocusedHook] = useState(opened);
    const [isOpenedHook, setIsOpenedHook] = useState(opened);
    const [itemsRefsHook, setItemsRefsHook] = useState([]); // list items for auto scroll in dropdown

    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const selectRef = useRef(null);

    className = ClassNames(
        'kui-select',
        (disabled) ? 'kui-select--disabled' : null,
        (isOpenedHook) ? 'kui-select--opened' : null,
        (variant) ? 'kui-select--variant_' + variant : null,
        className
    );

    const onSelectListInit = (refs) => {
        setItemsRefsHook(refs);
    }

    const openDropdown = (e) => {
        setIsOpenedHook(true);
        calcDirection();
        if (onOpen) onOpen(e);
    }

    const calcDirection = () => {
        if (direction !== 'auto') return;
        let el = selectRef.current.getBoundingClientRect();
        let dir = (el.top > window.innerHeight * 2 / 3) ? 'up' : 'down';
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

    const setValue = (value) => {
        setValueHook(value);
        inputRef.current.setIsFilled(value);
    }

    attributes.onChange = (e) => {
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

    attributes.onFocus = (e) => {
        setTimeout(() => {
            if (!isFocusedHook) {
                setIsFocusedHook(true);
                openDropdown(e);
            }
        }, 100); // delay after onClick
        if (onFocus) onFocus(e);
    }

    attributes.onBlur = (e) => {
        if (isFocusedHook) {
            setIsFocusedHook(false);
            setIsOpenedHook(false);
        }
        if (onBlur) onBlur(e);
    }

    attributes.onClick = (e) => {
        if (isFocusedHook) {
            if (!isOpenedHook) {
                openDropdown(e);
            } else {
                setIsOpenedHook(!isOpenedHook);
            }
            if (e) e.stopPropagation();
        }
        if (onClick) onClick(e);
    }

    if (children) {
        if (!children.length) children = [children]; // if 1 child
        dropdownBody = React.Children.map(children, (child) => {
            if (child.type.name !== 'SelectList') return child;
            list = child.props.children;
            return React.cloneElement(child, {
                active: activeHook,
                onChange: attributes.onChange,
                onSelectListInit
            });
        });
    }

    const findValue = (value) => {
        return new Promise(function(resolve, reject) {
            if (!value || !list || !list.length) {
                reject();
                return;
            }
            let val = value.toLowerCase();
            React.Children.forEach(list, (child, index) => {
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

    attributes.onKeyUp = (e) => {
        if (!e) return;
        if (onKeyUp) onKeyUp(e);
        e.persist();
        findValue(e.target.value)
            .then(found => {
                if (!isOpenedHook && e.which !== 13) { // open if closed
                    openDropdown(e);
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
                    openDropdown(e);
                }
            })
            .then(() => { // dont know why it works only in then
                if (e.which === 27) { // esc
                    setValueHook(initialValue + 'jopa'); // doesnt reset to initialValue without it
                    setIsOpenedHook(false);
                    setActiveHook(active);
                    setValue(initialValue);
                }
            });
    }

    attributes.onEnter = (e) => {
        if (!isSearch) {
            setIsOpenedHook(false);
        }
        if (onEnter) onEnter();
    }

    useEffect(() => {
        if (active !== null && list.length) {
            setInitialValue(list[active].props.children);
            setValue(list[active].props.children);
        }
    }, []);

    useEffect(() => {
        onActiveChanged();
    }, [activeHook]);

    return (
        <div className={className} ref={selectRef}>
            <Input
                autosize={false}
                readOnly={!editable}
                ref={inputRef}
                value={valueHook}
                variant={variant}
                {...attributes}
            />
            <Dropdown
                direction={directionHook}
                opened={isOpenedHook}
                ref={dropdownRef}
                onAnimationEnd={dropdownAnimationEnd}
            >
                {dropdownBody}
            </Dropdown>
        </div>
    );
};

Select.propTypes = {
    active: PropTypes.number,
    color: PropTypes.oneOf([
        'grey'
    ]),
    direction: PropTypes.oneOf([
        'auto',
        'down',
        'up'
    ]),
    disabled: PropTypes.bool,
    editable: PropTypes.bool,
    icon: PropTypes.string,
    label: PropTypes.string,
    opened: PropTypes.bool,
    variant: PropTypes.oneOf([
        'arrow',
        'header',
        'priority',
        'search',
        'withicon'
    ]),
    onOpen: PropTypes.func
};

Select.defaultProps = {
    active: null,
    color: null,
    direction: 'auto',
    disabled: false,
    editable: false,
    icon: null,
    label: null,
    opened: false,
    variant: null,
    onOpen: null
};

export default Select;