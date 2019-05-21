import React, { useState, useEffect, useRef } from 'react';
import { PropTypes, ClassNames, ClassVariants } from '../utils';
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
        variants,
        onBlur,
        onChange,
        onClick,
        onEnter,
        onFocus,
        onKeyUp,
        ...attributes
    } = props,
        dropdownBody = null,
        list = [],
        isSearch = variants.includes('search');

    const [activeHook, setActiveHook] = useState(active);
    const [directionHook, setDirectionHook] = useState(direction);
    const [initialValue, setInitialValue] = useState('');
    const [valueHook, setValueHook] = useState('');
    const [isFocusedHook, setIsFocusedHook] = useState(opened);
    const [isOpenedHook, setIsOpenedHook] = useState(opened);
    const [isClosedHook, setIsClosedHook] = useState(false); // after closing
    const [itemsRefsHook, setItemsRefsHook] = useState([]); // list items for auto scroll in dropdown

    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const selectRef = useRef(null);

    className = ClassNames(
        'kui-select',
        (disabled) ? 'kui-select--disabled' : null,
        (isOpenedHook) ? 'kui-select--opened' : null,
        ClassVariants({variants, prefix: 'kui-select--variant_'}),
        className
    );

    const onSelectListInit = (refs) => {
        setItemsRefsHook(refs);
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
        } else if (isClosedHook) {
            selectRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'});
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
            setIsClosedHook(true);
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
                setIsOpenedHook(true);
                calcDirection();
            }
        }, 100); // delay after onClick
        if (onFocus) onFocus(e);
    }

    attributes.onBlur = (e) => {
        if (isFocusedHook) {
            setIsFocusedHook(false);
            setIsOpenedHook(false);
            setIsClosedHook(true);
        }
        if (onBlur) onBlur(e);
    }

    attributes.onClick = (e) => {
        if (isFocusedHook) {
            let isOpened = isOpenedHook;
            setIsOpenedHook(!isOpenedHook);
            if (isOpened) {
                setIsClosedHook(true);
            } else {
                calcDirection();
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
                setActiveHook(found.index);
                if (e.which === 39 || e.which === 13) { // arrow right || enter
                    setValue(found.text);
                }
                if (!isOpenedHook && e.which !== 13) { // open if closed
                    setIsOpenedHook(true);
                    calcDirection();
                }
                if (onChange) onChange(Object.assign({}, e, {item: found}));
            })
            .catch(() => {
                setActiveHook(null);
            })
            .then(() => { // dont know why it works only in then
                if (e.which === 27) { // esc
                    setValueHook(initialValue + 'jopa'); // doesnt reset to initialValue without it
                    setIsOpenedHook(false);
                    setIsClosedHook(true);
                    setActiveHook(active);
                    setValue(initialValue);
                }
            });
    }

    attributes.onEnter = (e) => {
        if (!isSearch) {
            setIsOpenedHook(false);
            setIsClosedHook(true);
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
                variants={variants}
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

Select.variants = [
    'arrow',
    'grey',
    'header',
    'withicon',
    'priority',
    'search'
];

Select.propTypes = {
    active: PropTypes.number,
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
    variants: PropTypes.arrayOf(PropTypes.string)
};

Select.defaultProps = {
    active: null,
    direction: 'auto',
    disabled: false,
    editable: false,
    icon: null,
    label: null,
    opened: false,
    variants: []
};

export default Select;