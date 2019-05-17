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
    const inputRef = useRef(null);
    const selectRef = useRef(null);
    
    className = ClassNames(
        'kui-select',
        (disabled) ? 'kui-select--disabled' : null,
        (isOpenedHook) ? 'kui-select--opened' : null,
        ClassVariants({variants, prefix: 'kui-select--variant_'}),
        className
    );

    attributes.onChange = (e) => {
        if (!isSearch && e.item) { // list item clicked
            setIsOpenedHook(false);
            setValueHook(e.item.children);
            setActiveHook(e.index);
            inputRef.current.setIsFilled(true);
        }
        setTimeout(() => {
            selectRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'});
        }, 200); // wait for mobile keyboard hide
        if (onChange) onChange(e);
    }

    attributes.onFocus = (e) => {
        setTimeout(() => {
            if (!isFocusedHook) {
                setIsFocusedHook(true);
                setIsOpenedHook(true);
                if (isMobileDevice()) selectRef.current.scrollIntoView({block: 'start', behavior: 'smooth'});
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
            setIsOpenedHook(!isOpenedHook);
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
                onChange: attributes.onChange
            });
        });
    }

    const findValue = (value) => {
        if (!value || !list || !list.length) return null;
        let found = null;
        React.Children.forEach(list, (child, index) => {
            if (found === null &&
                ((child.props.children === value)
                || child.props.children.includes(value))
            ) found = {index, value: child.props.children};
        });
        return found;
    }

    attributes.onKeyUp = (e) => {
        let findVal = findValue(e.target.value) || {index: null, value: ''}
        setActiveHook(findVal.index);
        if (e && (e.which === 39)) { // arrow right
            setValueHook(findVal.value);
        }
        if (onKeyUp) onKeyUp(e);
    }

    attributes.onEnter = (e) => {
        setIsOpenedHook(false);
    }

    useEffect(() => {
        if (active !== null && list.length) React.Children.forEach(list, (child, index) => {
            if (active === index) setValueHook(child.props.children); // initial Select value
        });
    }, []);

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
            <Dropdown opened={isOpenedHook}>
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