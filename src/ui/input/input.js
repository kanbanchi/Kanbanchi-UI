import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { PropTypes, ClassNames, ClassVariants } from '../utils';
import {default as autosizeLibray} from './autosize';
import { Icon, Label } from '../../ui';
import '../../../src/ui/input/input.module.scss';

export const Input = forwardRef((props, ref) => {
    let {
        autosize,
        className,
        disabled,
        label,
        value,
        variants,
        onChange,
        onEnter,
        onKeyDown,
        ...attributes
    } = props,
        labelItem = null,
        inputBefore = null,
        inputAfter = null;

    const [isFilled, setIsFilled] = useState(!!value);
    const [inputValue, setInputValue] = useState(value);
    const textarea = useRef(null);
    
    className = ClassNames(
        'kui-input',
        (disabled) ? 'kui-input--disabled' : null,
        (isFilled) ? 'kui-input--filled' : null,
        (!autosize) ? 'kui-input--noresize' : null,
        ClassVariants({variants, prefix: 'kui-input--variant_'}),
        className
    );

    attributes.type = 'text';
    attributes.className = 'kui-input__item';
    if (disabled) {
        attributes.disabled = true;
    }

    attributes.onChange = e => {
        setIsFilled(!!e.target.value);
        setInputValue(e.target.value);
        if (onChange) onChange(e);
    };

    attributes.onKeyDown = e => {
        if (e && (e.which === 10 || e.which === 13)) {
            if (!autosize) e.preventDefault();
            if (onEnter) onEnter(e);
        }
        if (onKeyDown) onKeyDown(e);
    };

    if (label) {
        labelItem = (<div className="kui-label__item">{label}</div>);
    }

    useEffect(() => {
        if (autosize) autosizeLibray(textarea.current);
    }, []);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    if (variants.includes('arrow')) {
        inputAfter = <Icon xlink="arrow-down" size={24} className="kui-input__icon-arrow" />;
    }

    const clearSearch = () => {
        setIsFilled(false);
        setInputValue('');
        textarea.current.blur();
    };

    if (variants.includes('search')) {
        inputBefore = (<span className="kui-input-search">
            <Icon xlink="search" size={24} className="kui-input-search__icon" />
            <span className="kui-input-search__placeholder">
                Search
            </span>
        </span>);
        inputAfter = <Icon xlink="clear" size={24} className="kui-input__icon-clear" onClick={clearSearch} />;
    }

    useImperativeHandle(ref, e => ({
        onChange(e) {
            setIsFilled(!!e.target.value);
        },
        blur() {
            textarea.current.blur();
        }
    }));

    return (
        <Label className={className}>
            {labelItem}
            {inputBefore}
            <textarea 
                rows={1}
                ref={textarea}
                value={inputValue}
                {...attributes}
            ></textarea>
            {inputAfter}
        </Label>
    );
});

Input.propTypes = {
    autosize: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
    variants: PropTypes.arrayOf(PropTypes.string)
};

Input.defaultProps = {
    autosize: true,
    disabled: false,
    label: null,
    value: '',
    variants: []
};

export default Input;