import React, { useState, useEffect } from 'react';
import { PropTypes, ClassNames, ClassVariants } from '../utils';
import { Input, Dropdown } from '../../ui';
import '../../../src/ui/select/select.module.scss';

export const Select = (props) => {
    let {
        active,
        children,
        className,
        disabled,
        variants,
        onBlur,
        onChange,
        onFocus,
        ...attributes
    } = props,
        dropdownBody = null,
        list = [];

    const [valueHook, setValueHook] = useState('');
    const [isOpenedHook, setIsOpenedHook] = useState(false);

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
        active,
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
    label: PropTypes.string,
    disabled: PropTypes.bool,
    variants: PropTypes.arrayOf(PropTypes.string)
};

Select.defaultProps = {
    active: null,
    label: null,
    disabled: false,
    variants: []
};

export default Select;