import React, { useState, useEffect, useRef } from 'react';
import { PropTypes, ClassNames, ClassVariants } from '../utils';
import { Input, Dropdown } from '../../ui';
import '../../../src/ui/select/select.module.scss';

export const Select = (props) => {
    let {
        active,
        children,
        className,
        disabled,
        editable,
        variants,
        onBlur,
        onChange,
        onFocus,
        ...attributes
    } = props,
        dropdownBody = null,
        list = [];

    const [activeHook, setActiveHook] = useState(active);
    const [valueHook, setValueHook] = useState('');
    const [isOpenedHook, setIsOpenedHook] = useState(false);
    const inputEl = useRef(null);

    className = ClassNames(
        'kui-select',
        (disabled) ? 'kui-select--disabled' : null,
        (isOpenedHook) ? 'kui-select--opened' : null,
        ClassVariants({variants, prefix: 'kui-select--variant_'}),
        className
    );

    attributes.onChange = (e) => {
        if (e.item) { // list item clicked
            setIsOpenedHook(false);
            setValueHook(e.item.children);
            setActiveHook(e.index);
            e.target = {value: e.item.children};
            inputEl.current.onChange(e);
        }
        if (onChange) onChange(e);
    }

    attributes.onFocus = (e) => {
        setIsOpenedHook(true);
        if (onFocus) onFocus(e);
    }

    attributes.onBlur = (e) => {
        setTimeout(()=>setIsOpenedHook(false), 100); // it can be click on dropdown
        if (onBlur) onBlur(e);
    }

    const listAttributes = {
        active: activeHook,
        onChange: attributes.onChange
    };

    if (children.length) {
        dropdownBody = React.Children.map(children, (child) => {
            if (child.type.name !== 'SelectList') return child;
            list = child.props.children;
            return React.cloneElement(child, listAttributes);
        });
    } else if (children) {
        list = children.props.children;
        dropdownBody = React.cloneElement(children, listAttributes);
    }

    attributes.onEnter = (e) => {
        setIsOpenedHook(false);
        inputEl.current.blur();
        let newIndex = null;
        if (list.length) React.Children.forEach(list, (child, index) => {
            if (child.props.children === e.target.value) newIndex = index;
        });
        setActiveHook(newIndex);
    }

    useEffect(() => {
        if (active !== null && list.length) React.Children.forEach(list, (child, index) => {
            if (active === index) setValueHook(child.props.children); // initial Select value
        });
    }, []);

    const variantsInput = variants.filter(variant => {
        return Select.variantsOfInput.includes(variant);
    });

    return (
        <div className={className}>
            <Input
                autosize={false}
                value={valueHook}
                variants={variantsInput}
                readOnly={!editable}
                ref={inputEl}
                {...attributes}
            />
            <Dropdown opened={isOpenedHook}>
                {dropdownBody}
            </Dropdown>
        </div>
    );
};

Select.variantsOfInput = [
    'arrow'
];

Select.propTypes = {
    active: PropTypes.number,
    disabled: PropTypes.bool,
    editable: PropTypes.bool,
    label: PropTypes.string,
    variants: PropTypes.arrayOf(PropTypes.string)
};

Select.defaultProps = {
    active: null,
    disabled: false,
    editable: false,
    label: null,
    variants: []
};

export default Select;