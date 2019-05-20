import React, { useState, useEffect, useRef } from 'react';
import { PropTypes, ClassNames, ClassVariants, isMobileDevice } from '../utils';
import { Input, Dropdown } from '../../ui';
import '../../../src/ui/select/select.module.scss';

export const Select = (props) => {
    let {
        active,
        children,
        className,
        disabled,
        editable,
        opened,
        variants,
        onBlur,
        onChange,
        onClick,
        onFocus,
        onKeyUp,
        ...attributes
    } = props,
        dropdownBody = null,
        list = [],
        isSearch = variants.includes('search');

    const [activeHook, setActiveHook] = useState(active);
    const [valueHook, setValueHook] = useState('');
    const [isFocusedHook, setIsFocusedHook] = useState(opened);
    const [isOpenedHook, setIsOpenedHook] = useState(opened);
    const [itemsRefsHook, setItemsRefsHook] = useState([]);

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

    const scrollToActive = () => {
        if (itemsRefsHook[activeHook]) {
            setTimeout(() => {
                dropdownRef.current.scrollTop = itemsRefsHook[activeHook].current.offsetTop - itemsRefsHook[activeHook].current.offsetHeight; // scroll to item - 1
                if (dropdownRef.current.scrollHeight > dropdownRef.current.offsetHeight) selectRef.current.scrollIntoView({block: 'start', behavior: 'smooth'});
            }, 300); // wait for dropdown animation
        }
    }

    attributes.onChange = (e) => {
        if (e.item) { // list item clicked
            setIsOpenedHook(false);
            setActiveHook(e.item.index);
            setTimeout(() => {
                selectRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'});
            }, 200); // wait for mobile keyboard hide
            if (isSearch) { // dont update search input value
                if (onChange) onChange(e);
            } else if (e.item.text !== valueHook) {
                inputRef.current.setIsFilled(true);
                setValueHook(e.item.text);
                if (onChange) onChange(e);        
            }
        }
    }

    attributes.onFocus = (e) => {
        setTimeout(() => {
            if (!isFocusedHook) {
                setIsFocusedHook(true);
                setIsOpenedHook(true);
                if (isMobileDevice()) selectRef.current.scrollIntoView({block: 'start', behavior: 'smooth'});
                scrollToActive();
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
            let isOpened = isOpenedHook;
            setIsOpenedHook(!isOpenedHook);
            if (!isOpened) scrollToActive();
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
            if (!value || !list || !list.length) reject();
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
        e.persist();
        findValue(e.target.value)
            .then(found => {
                setActiveHook(found.index);
                if (e && (e.which === 39)) { // arrow right
                    setValueHook(found.text);
                }
                if (onChange) onChange(Object.assign({}, e, {item: found}));
            })
            .catch(() => {
                setActiveHook(null);
            });
        if (onKeyUp) onKeyUp(e);
    }

    attributes.onEnter = (e) => {
        setIsOpenedHook(false);
    }

    useEffect(() => {
        if (active !== null && list.length) {
            let val = list[active].props.children;
            setValueHook(val); // initial Select value
            inputRef.current.setIsFilled(val);
        }
    }, []);

    useEffect(() => {
        scrollToActive();
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
                opened={isOpenedHook}
                ref={dropdownRef}
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
    disabled: PropTypes.bool,
    editable: PropTypes.bool,
    icon: PropTypes.string,
    label: PropTypes.string,
    opened: PropTypes.bool,
    variants: PropTypes.arrayOf(PropTypes.string)
};

Select.defaultProps = {
    active: null,
    disabled: false,
    editable: false,
    icon: null,
    label: null,
    opened: false,
    variants: []
};

export default Select;